import { createCanvasLifecycle } from '../core/canvas-lifecycle'

import { FrameStore } from './frame-store'
import { DampedPlayhead } from './damped-playhead'

export class ServicesFrameSequence {
    constructor(section, stage, canvas, chapters) {
        this.section = section
        this.stage = stage
        this.canvas = canvas
        this.chapters = chapters

        this.context = canvas.getContext('2d', {
            alpha: false
        })

        this.baseUrl = section.dataset.sequenceUrl
        this.store = null
        this.playhead = null
        this.manifest = null

        this.width = 0
        this.height = 0
        this.dpr = 1

        this.progress = 0
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
        this.presentationFrame = null

        this.controller = new AbortController()

        this.tick = this.tick.bind(this)
        this.resize = this.resize.bind(this)
    }

    async init() {
        const response = await fetch(
            `${this.baseUrl}/manifest.json`,
            {
                signal: this.controller.signal
            }
        )

        if (!response.ok) {
            throw new Error('Services manifest unavailable')
        }

        const manifest = await response.json()

        if (this.destroyed) return

        this.manifest = manifest

        this.store = new FrameStore(
            this.baseUrl,
            manifest,
            {
                cacheLimit: 16,
                maxConcurrent: 3
            }
        )

        this.playhead = new DampedPlayhead({
            min: 0,
            max: manifest.totalFrames - 1,
            damping: 0.12,
            minDamping: 0.065,
            maxDamping: 0.16,
            maxSpeed: 100,
            boostSpeed: 190,
            velocityDamping: 0.085,
            velocityThreshold: 100,
            directionDamping: 0.025
        })

        this.resize()

        this.observer = new ResizeObserver(this.resize)
        this.observer.observe(this.stage)

        this.lifecycle = createCanvasLifecycle(this.section, {
            wake: () => this.wake(),
            sleep: () => this.sleep()
        })
    }

    clamp(value, min = 0, max = 1) {
        return Math.max(min, Math.min(max, value))
    }

    smooth(value) {
        const t = this.clamp(value)

        return t * t * (3 - 2 * t)
    }

    mapProgress(progress) {
        const points = [
            [0, 0],
            [0.15, 0.10],
            [0.40, 0.40],
            [0.62, 0.62],
            [0.83, 0.83],
            [1, 1]
        ]

        for (let i = 1; i < points.length; i++) {
            const [x0, y0] = points[i - 1]
            const [x1, y1] = points[i]

            if (progress <= x1) {
                const t = (progress - x0) / (x1 - x0)

                return y0 + (y1 - y0) * t
            }
        }

        return 1
    }

    drawTransition(frame, image) {
        const transitions = [
            { cut: 12, length: 4 },
            { cut: 48, length: 5 },
            { cut: 74, length: 5 },
            { cut: 99, length: 3 },
            { cut: 104, length: 4 }
        ]

        const transition = transitions.find(item =>
            frame >= item.cut &&
            frame < item.cut + item.length
        )

        this.context.globalAlpha = 1

        if (!transition) {
            this.draw(image)
            return
        }

        const previous = this.store.get(transition.cut - 1)

        if (!previous) {
            this.draw(image)
            return
        }

        const progress = this.smooth(
            (frame - transition.cut + 1) /
            transition.length
        )

        this.draw(previous)

        this.context.globalAlpha = progress
        this.draw(image)
        this.context.globalAlpha = 1
    }

    setProgress(progress) {
        this.progress = this.clamp(progress)
    }

    resize() {
        const width = this.stage.clientWidth
        const height = this.stage.clientHeight

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            1.5
        )

        if (!width || !height) return

        if (
            width === this.width &&
            height === this.height &&
            dpr === this.dpr
        ) {
            return
        }

        this.width = width
        this.height = height
        this.dpr = dpr

        this.canvas.width = Math.round(width * dpr)
        this.canvas.height = Math.round(height * dpr)

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

        this.context.drawImage(
            image,
            (this.width - width) / 2,
            (this.height - height) / 2,
            width,
            height
        )
    }

    findAvailableFrame(target) {
        if (this.store.has(target)) return target

        const direction = this.playhead.direction

        for (let offset = 1; offset <= 8; offset++) {
            const frame = target - offset * direction

            if (
                frame < 0 ||
                frame >= this.manifest.totalFrames
            ) {
                break
            }

            if (
                this.displayedFrame >= 0 &&
                (frame - this.displayedFrame) * direction < 0
            ) {
                continue
            }

            if (this.store.has(frame)) return frame
        }

        return null
    }

    render(target) {
        let frame = this.findAvailableFrame(target)

        if (frame === null && this.needsDraw) {
            if (this.store.has(this.displayedFrame)) {
                frame = this.displayedFrame
            }
        }

        if (frame === null) return

        if (
            frame === this.displayedFrame &&
            !this.needsDraw
        ) {
            return
        }

        const image = this.store.get(frame)

        if (!image) return

        this.drawTransition(frame, image)

        this.displayedFrame = frame
        this.needsDraw = false

        this.section.classList.add('is-services-ready')
    }

    updatePresentation() {
        if (this.displayedFrame === this.presentationFrame) return

        this.presentationFrame = this.displayedFrame

        const progress = Math.max(
            0,
            this.displayedFrame
        ) / Math.max(1, this.manifest.totalFrames - 1)

        const position = progress * this.chapters.length

        this.chapters.forEach((chapter, index) => {
            const entrance = index === 0
                ? 1
                : this.smooth(
                    (position - index + 0.15) / 0.3
                )

            const exit = index === this.chapters.length - 1
                ? 1
                : 1 - this.smooth(
                    (position - index - 0.85) / 0.3
                )

            const opacity = entrance * exit

            const y =
                (1 - entrance) * 18 -
                (1 - exit) * 18

            chapter.style.opacity = opacity.toFixed(3)

            chapter.style.visibility =
                opacity > 0.01 ? 'visible' : 'hidden'

            chapter.style.transform =
                `translate3d(0,${y.toFixed(2)}px,0)`
        })

        const camera =
            1.01 + Math.sin(progress * Math.PI) * 0.03

        this.stage.style.setProperty(
            '--services-camera',
            camera.toFixed(4)
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

        const rect = this.section.getBoundingClientRect()

        if (
            rect.bottom < -this.height ||
            rect.top > window.innerHeight + this.height
        ) {
            return
        }

        const target =
            this.mapProgress(this.progress) * (this.manifest.totalFrames - 1)

        this.playhead.setTarget(target)

        if (
            this.progress === 0 ||
            this.progress === 1
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
            destination !== this.requestedDestination ||
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
        this.updatePresentation()
    }

    destroy() {
        this.destroyed = true

        this.controller.abort()

        cancelAnimationFrame(this.raf)

        this.lifecycle?.destroy()
        this.observer?.disconnect()
        this.store?.destroy()

        this.chapters.forEach(chapter => {
            chapter.style.removeProperty('opacity')
            chapter.style.removeProperty('visibility')
            chapter.style.removeProperty('transform')
        })

        this.stage.style.removeProperty('--services-camera')

        this.section.classList.remove(
            'is-services-ready'
        )
    }
}
