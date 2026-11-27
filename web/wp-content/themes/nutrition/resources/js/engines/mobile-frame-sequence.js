import { createCanvasLifecycle } from '../core/canvas-lifecycle'

import { FrameStore } from './frame-store'
import { DampedPlayhead } from './damped-playhead'

export class MobileFrameSequence {
    constructor(hero, profile) {
        this.hero = hero
        this.profile = profile

        this.stage = hero.querySelector('[data-hero-stage]')
        this.canvas = hero.querySelector('[data-hero-canvas]')
        this.title = hero.querySelector('[data-hero-title]')
        this.indicator = hero.querySelector('.hero-scroll')

        this.context = this.canvas.getContext('2d', {
            alpha: false
        })

        this.transitionCanvas = document.createElement('canvas')
        this.transitionContext = this.transitionCanvas.getContext('2d')

        this.transitionCanvas.className = 'hero-transition-canvas'
        this.transitionCanvas.setAttribute('aria-hidden', 'true')

        this.baseUrl =
            hero.dataset.sequenceUrl.replace(/\/$/, '') + '/mobile'

        this.titles = JSON.parse(hero.dataset.heroTitles || '[]')

        this.manifest = null
        this.store = null
        this.playhead = null
        this.timeline = []

        this.width = 0
        this.height = 0
        this.dpr = 1

        this.activeScene = -1
        this.firstFrameMarked = false
        this.displayedFrame = -1
        this.requestedFrame = -1
        this.requestedDirection = 0
        this.requestedDestination = -1

        this.lastTime = 0
        this.lastRequestTime = 0
        this.raf = 0

        this.destroyed = false
        this.sleeping = false
        this.lifecycle = null
        this.needsDraw = true
        this.presentationProgress = null

        this.tick = this.tick.bind(this)
        this.resize = this.resize.bind(this)
    }

    async init() {
        const response = await fetch(
            `${this.baseUrl}/manifest.json`,
            { cache: 'no-cache' }
        )

        if (!response.ok) {
            throw new Error('Mobile manifest unavailable')
        }

        this.manifest = await response.json()

        this.store = new FrameStore(
            this.baseUrl,
            this.manifest,
            {
                cacheLimit: this.profile.hero.cacheLimit,
                maxConcurrent: this.profile.hero.maxConcurrent
            }
        )

        this.playhead = new DampedPlayhead({
            min: 0,
            max: this.manifest.totalFrames - 1,
            damping: this.profile.hero.damping,
            minDamping: this.profile.hero.minDamping,
            maxDamping: this.profile.hero.maxDamping,
            maxSpeed: this.profile.hero.maxFrameSpeed,
            boostSpeed: this.profile.hero.boostFrameSpeed,
            velocityDamping: this.profile.hero.velocityDamping,
            velocityThreshold: this.profile.hero.velocityThreshold,
            directionDamping: this.profile.hero.directionDamping
        })

        this.createTimeline()

        this.hero.style.setProperty(
            '--hero-scroll-distance',
            `${this.profile.hero.scrollDistance * 100}svh`
        )

        this.hero.classList.add('is-mobile-cinematic')

        this.canvas.after(this.transitionCanvas)

        this.resize()

        this.observer = new ResizeObserver(this.resize)
        this.observer.observe(this.stage)

        const initialFrame = this.getTargetFrame(this.getProgress())

        this.playhead.snap(initialFrame)
        this.store.request(initialFrame)

        const deadline = performance.now() + 1200
        const frame = Math.round(initialFrame)

        while (
            !this.store.has(frame) &&
            performance.now() < deadline
        ) {
            await new Promise(resolve =>
                requestAnimationFrame(resolve)
            )
        }

        this.render(frame)

        this.lifecycle = createCanvasLifecycle(this.hero, {
            wake: () => this.wake(),
            sleep: () => this.sleep()
        })

        await new Promise(resolve =>
            requestAnimationFrame(() =>
                requestAnimationFrame(resolve)
            )
        )

        return this.manifest
    }

    createTimeline() {
        const totalWeight = this.manifest.scenes.reduce(
            (total, scene) => total + (scene.scrollWeight ?? 1),
            0
        )

        let cursor = 0

        this.timeline = this.manifest.scenes.map(scene => {
            const duration =
                (scene.scrollWeight ?? 1) / totalWeight

            const entry = {
                ...scene,
                scrollStart: cursor,
                scrollEnd: cursor + duration,
                scrollDuration: duration
            }

            cursor += duration

            return entry
        })
    }

    clamp(value, min = 0, max = 1) {
        return Math.max(min, Math.min(max, value))
    }

    getProgress() {
        const rect = this.hero.getBoundingClientRect()

        const distance =
            this.hero.offsetHeight - this.stage.offsetHeight

        if (distance <= 0) return 0

        return this.clamp(-rect.top / distance)
    }

    mapProgress(progress, curve) {
        if (!Array.isArray(curve) || curve.length < 2) {
            return progress
        }

        for (let i = 1; i < curve.length; i++) {
            const [x0, y0] = curve[i - 1]
            const [x1, y1] = curve[i]

            if (progress <= x1 && x1 > x0) {
                const ratio = this.clamp(
                    (progress - x0) / (x1 - x0)
                )

                return y0 + (y1 - y0) * ratio
            }
        }

        return curve[curve.length - 1][1]
    }

    getTargetFrame(progress) {
        const scene = this.timeline.find(
            entry => progress < entry.scrollEnd
        ) ?? this.timeline[this.timeline.length - 1]

        const localProgress = this.clamp(
            (progress - scene.scrollStart) / scene.scrollDuration
        )

        const frameProgress = this.profile.reduced
            ? 0.5
            : this.clamp(
                this.mapProgress(localProgress, scene.speedCurve)
            )

        return scene.startFrame +
            frameProgress * (scene.frameCount - 1)
    }

    getSceneIndex(frame) {
        return this.timeline.findIndex(
            scene =>
                frame >= scene.startFrame &&
                frame <= scene.endFrame
        )
    }

    resize() {
        const width = this.stage.clientWidth
        const height = this.stage.clientHeight

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            this.profile.hero.maxDpr
        )

        if (!width || !height) return

        if (
            width === this.width &&
            height === this.height &&
            dpr === this.dpr
        ) {
            return
        }

        this.transitionAnimation?.cancel()

        this.width = width
        this.height = height
        this.dpr = dpr

        this.canvas.width = Math.round(width * dpr)
        this.canvas.height = Math.round(height * dpr)

        this.transitionCanvas.width = this.canvas.width
        this.transitionCanvas.height = this.canvas.height

        this.context.setTransform(dpr, 0, 0, dpr, 0, 0)

        this.needsDraw = true
    }

    draw(image) {
        const imageWidth = image.naturalWidth || image.width
        const imageHeight = image.naturalHeight || image.height

        const scale = Math.max(
            this.width / imageWidth,
            this.height / imageHeight
        )

        const width = imageWidth * scale
        const height = imageHeight * scale

        const x = (this.width - width) / 2
        const y = (this.height - height) / 2

        this.context.drawImage(image, x, y, width, height)

        if (!this.firstFrameMarked) {
            this.firstFrameMarked = true

            if (!performance.getEntriesByName('hero:first-frame').length) {
                performance.mark('hero:first-frame')
            }
        }
    }

    captureTransition() {
        if (
            this.profile.reduced ||
            this.displayedFrame < 0 ||
            this.needsDraw
        ) {
            return
        }

        this.transitionAnimation?.cancel()

        this.transitionContext.clearRect(
            0,
            0,
            this.transitionCanvas.width,
            this.transitionCanvas.height
        )

        this.transitionContext.drawImage(this.canvas, 0, 0)

        this.transitionCanvas.style.filter =
            this.canvas.style.filter

        this.transitionAnimation = this.transitionCanvas.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ],
            {
                duration: this.profile.hero.sceneTransition,
                easing: 'ease-out'
            }
        )
    }

    updateScene(index) {
        if (index < 0 || index === this.activeScene) return

        const scene = this.timeline[index]
        const initial = this.activeScene === -1

        this.activeScene = index

        this.canvas.style.filter = [
            `brightness(${scene.brightness ?? 1})`,
            `contrast(${scene.contrast ?? 1})`,
            `saturate(${scene.saturation ?? 1})`
        ].join(' ')

        if (this.title) {
            this.titleAnimation?.cancel()

            this.title.textContent =
                this.titles[index] ?? scene.title

            if (!this.profile.reduced) {
                this.titleAnimation = this.title.animate(
                    [
                        {
                            opacity: 0,
                            transform: 'translate3d(0,18px,0)',
                            clipPath: 'inset(0 0 100% 0)'
                        },
                        {
                            opacity: 1,
                            transform: 'translate3d(0,0,0)',
                            clipPath: 'inset(0 0 0% 0)'
                        }
                    ],
                    {
                        duration: this.profile.hero.titleDuration,
                        easing: 'cubic-bezier(.22,1,.36,1)'
                    }
                )
            }
        }

        if (initial) {
            this.hero.classList.add('is-hero-ready')

            if (!this.profile.reduced) {
                this.entranceAnimation = this.canvas.animate(
                    [
                        { opacity: 0 },
                        { opacity: 1 }
                    ],
                    {
                        duration: this.profile.hero.entranceDuration,
                        easing: 'cubic-bezier(.22,1,.36,1)'
                    }
                )
            }
        }
    }

    findAvailableFrame(target) {
        if (this.store.has(target)) return target

        const scene = this.store.getScene(target)

        if (!scene) return null

        const direction = this.playhead.direction

        for (let offset = 1; offset <= 12; offset++) {
            const frame = target - offset * direction

            if (
                frame < scene.startFrame ||
                frame > scene.endFrame
            ) {
                break
            }

            if (
                this.displayedFrame >= scene.startFrame &&
                this.displayedFrame <= scene.endFrame &&
                (frame - this.displayedFrame) * direction < 0
            ) {
                continue
            }

            if (this.store.has(frame)) return frame
        }

        return null
    }

    render(target) {
        const frame = this.findAvailableFrame(target)

        if (frame === null) {
            if (this.needsDraw) {
                const previous = this.store.get(this.displayedFrame)

                if (previous) {
                    this.draw(previous)
                    this.needsDraw = false
                }
            }

            return
        }

        if (frame === this.displayedFrame && !this.needsDraw) {
            return
        }

        const image = this.store.get(frame)

        if (!image) return

        const sceneIndex = this.getSceneIndex(frame)

        if (sceneIndex !== this.activeScene) {
            this.captureTransition()
        }

        this.draw(image)
        this.updateScene(sceneIndex)

        this.displayedFrame = frame
        this.needsDraw = false
    }

    updatePresentation(progress) {
        if (progress === this.presentationProgress) return

        this.presentationProgress = progress

        if (this.indicator) {
            this.indicator.style.opacity =
                Math.max(0, 1 - progress * 12)
        }

        if (this.profile.reduced) return

        const exit = this.clamp((progress - 0.94) / 0.06)

        const smoothExit = exit * exit * (3 - 2 * exit)

        this.stage.style.setProperty(
            '--hero-exit',
            smoothExit.toFixed(4)
        )
    }

    wake() {
        if (this.destroyed || this.raf) return

        this.sleeping = false
        this.lastTime = 0
        this.requestedFrame = -1

        this.store?.resume()

        this.raf = requestAnimationFrame(this.tick)
    }

    sleep() {
        this.sleeping = true

        cancelAnimationFrame(this.raf)

        this.raf = 0
        this.lastTime = 0

        this.store?.pause()
    }

    tick(time) {
        if (this.destroyed || this.sleeping) return

        this.raf = requestAnimationFrame(this.tick)

        const dt = this.lastTime
            ? (time - this.lastTime) / 1000
            : 1 / 60

        this.lastTime = time

        const rect = this.hero.getBoundingClientRect()

        if (
            rect.bottom < -this.height ||
            rect.top > window.innerHeight + this.height
        ) {
            return
        }

        const progress = this.getProgress()
        const target = this.getTargetFrame(progress)

        this.playhead.setTarget(target)

        if (
            this.profile.reduced ||
            progress === 0 ||
            progress === 1
        ) {
            this.playhead.snap(target)
        } else {
            this.playhead.update(dt)
        }

        const frame = this.playhead.frame
        const direction = this.playhead.direction
        const destination = Math.round(target)

        if (
            frame !== this.requestedFrame ||
            direction !== this.requestedDirection ||
            Math.abs(destination - this.requestedDestination) >= 4 ||
            time - this.lastRequestTime > 500
        ) {
            this.store.request(
                frame,
                direction,
                this.playhead.velocity,
                destination
            )

            this.requestedFrame = frame
            this.requestedDirection = direction
            this.requestedDestination = destination
            this.lastRequestTime = time
        }

        this.render(frame)
        this.updatePresentation(progress)
    }

    destroy() {
        this.destroyed = true

        cancelAnimationFrame(this.raf)

        this.lifecycle?.destroy()
        this.observer?.disconnect()
        this.titleAnimation?.cancel()
        this.transitionAnimation?.cancel()
        this.entranceAnimation?.cancel()

        this.store?.destroy()
        this.transitionCanvas.remove()

        this.hero.classList.remove(
            'is-mobile-cinematic',
            'is-hero-ready'
        )

        this.hero.style.removeProperty('--hero-scroll-distance')
        this.stage.style.removeProperty('--hero-exit')
    }
}
