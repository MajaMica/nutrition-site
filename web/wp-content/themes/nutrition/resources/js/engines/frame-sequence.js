export class FrameSequence {
    constructor(canvas, baseUrl, options = {}) {
        this.canvas = canvas
        this.context = canvas.getContext('2d', { alpha: false })
        this.baseUrl = baseUrl.replace(/\/$/, '')

        this.cacheLimit = options.cacheLimit ?? 48
        this.preloadRadius = options.preloadRadius ?? 8
        this.maxConcurrent = options.maxConcurrent ?? 6
        this.maxDpr = options.maxDpr ?? 2

        this.manifest = null
        this.cache = new Map()
        this.pending = new Map()

        this.currentFrame = 0
        this.firstFrameMarked = false
        this.displayedFrame = null
        this.currentImage = null
        this.direction = 1
        this.processing = false

        this.width = 0
        this.height = 0
        this.dpr = 1

        this.resizeObserver = new ResizeObserver(() => {
            this.resize()
        })
    }

    async init() {
        const response = await fetch(
            `${this.baseUrl}/manifest.json`,
            { cache: 'no-cache' }
        )

        if (!response.ok) {
            throw new Error('Unable to load frame manifest')
        }

        this.manifest = await response.json()

        this.resize()
        this.resizeObserver.observe(this.canvas)

        await this.render(0)

        return this.manifest
    }

    getScene(index) {
        return this.manifest.scenes.find(
            (scene) =>
                index >= scene.startFrame &&
                index <= scene.endFrame
        )
    }

    getFrameUrl(index) {
        const scene = this.getScene(index)

        if (!scene) {
            throw new Error(`Invalid frame: ${index}`)
        }

        const fileIndex =
            (scene.fileStart ?? scene.startFrame) +
            index - scene.startFrame

        const filename =
            `frame_${String(fileIndex).padStart(6, '0')}.webp`

        return `${this.baseUrl}/${scene.directory}/${filename}`
    }

    loadFrame(index) {
        if (this.cache.has(index)) {
            const image = this.cache.get(index)

            this.cache.delete(index)
            this.cache.set(index, image)

            return Promise.resolve(image)
        }

        if (this.pending.has(index)) {
            return this.pending.get(index)
        }

        const promise = new Promise((resolve, reject) => {
            const image = new Image()

            image.decoding = 'async'

            image.onload = () => {
                this.cache.set(index, image)
                this.trimCache()
                resolve(image)
            }

            image.onerror = () => {
                reject(new Error(`Unable to load frame ${index}`))
            }

            image.src = this.getFrameUrl(index)
        }).finally(() => {
            this.pending.delete(index)
        })

        this.pending.set(index, promise)

        return promise
    }

    trimCache() {
        while (this.cache.size > this.cacheLimit) {
            const oldest = this.cache.keys().next().value
            this.cache.delete(oldest)
        }
    }

    preload(index) {
        for (
            let offset = 1;
            offset <= this.preloadRadius;
            offset++
        ) {
            const candidates = [
                index + offset * this.direction,
                index - offset * this.direction,
            ]

            for (const frame of candidates) {
                if (this.pending.size >= this.maxConcurrent - 1) {
                    return
                }

                if (
                    frame < 0 ||
                    frame >= this.manifest.totalFrames
                ) {
                    continue
                }

                if (
                    this.cache.has(frame) ||
                    this.pending.has(frame)
                ) {
                    continue
                }

                this.loadFrame(frame)
                    .then(() => {
                        this.preload(this.currentFrame)
                    })
                    .catch(() => {})
            }
        }
    }

    resize() {
        const width = this.canvas.clientWidth
        const height = this.canvas.clientHeight
        const dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr)

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

        this.canvas.width = Math.round(
            this.width * this.dpr
        )

        this.canvas.height = Math.round(
            this.height * this.dpr
        )

        this.context.setTransform(
            this.dpr, 0, 0, this.dpr, 0, 0
        )

        if (this.currentImage) {
            this.draw(this.currentImage)
        }
    }

    draw(image) {
        if (!this.width || !this.height) {
            return
        }

        const scale = Math.max(
            this.width / image.naturalWidth,
            this.height / image.naturalHeight
        )

        const width = image.naturalWidth * scale
        const height = image.naturalHeight * scale

        const x = (this.width - width) / 2
        const y = (this.height - height) / 2

        this.context.drawImage(
            image, x, y, width, height
        )

        if (!this.firstFrameMarked) {
            this.firstFrameMarked = true

            if (!performance.getEntriesByName('hero:first-frame').length) {
                performance.mark('hero:first-frame')
            }
        }
    }

    applyGrade(index) {
        const scene = this.getScene(index)

        if (!scene) return

        const brightness = scene.brightness ?? 1
        const contrast = scene.contrast ?? 1
        const saturation = scene.saturation ?? 1

        this.canvas.style.filter =
            `brightness(${brightness}) ` +
            `contrast(${contrast}) ` +
            `saturate(${saturation})`
    }

    display(index, image) {
        this.currentImage = image
        this.displayedFrame = index

        this.applyGrade(index)
        this.draw(image)
    }

    async render(index) {
        if (!this.manifest) return

        index = Math.max(
            0,
            Math.min(
                Math.round(index),
                this.manifest.totalFrames - 1
            )
        )

        if (index !== this.currentFrame) {
            this.direction =
                index > this.currentFrame ? 1 : -1
        }

        this.currentFrame = index

        if (this.cache.has(index)) {
            const image = this.cache.get(index)

            this.cache.delete(index)
            this.cache.set(index, image)

            if (this.displayedFrame === index) return

            this.display(index, image)
            this.preload(index)
            return
        }

        if (this.processing) return

        this.processing = true

        try {
            while (
                this.displayedFrame !== this.currentFrame
            ) {
                const target = this.currentFrame
                const image = await this.loadFrame(target)

                if (
                    target === this.currentFrame ||
                    !this.cache.has(this.currentFrame)
                ) {
                    this.display(target, image)
                }
            }
        } catch (error) {
            console.warn(error.message)
        } finally {
            this.processing = false
            this.preload(this.currentFrame)
        }
    }
}