
export class FrameStore {
    constructor(baseUrl, manifest, options = {}) {
        this.baseUrl = baseUrl.replace(/\/$/, '')
        this.manifest = manifest

        this.cacheLimit = options.cacheLimit ?? 24
        this.maxConcurrent = options.maxConcurrent ?? 3

        this.cache = new Map()
        this.pending = new Map()
        this.failed = new Map()

        this.queue = []
        this.wanted = new Set()

        this.target = 0
        this.direction = 1
        this.destroyed = false
        this.paused = false
    }

    clamp(index) {
        return Math.max(
            0,
            Math.min(
                this.manifest.totalFrames - 1,
                Math.round(index)
            )
        )
    }

    getScene(index) {
        return this.manifest.scenes.find(
            scene =>
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
            scene.fileStart + index - scene.startFrame

        const filename =
            `frame_${String(fileIndex).padStart(6, '0')}.webp`

        return `${this.baseUrl}/${scene.directory}/${filename}`
    }

    get(index) {
        return this.cache.get(index) ?? null
    }

    has(index) {
        return this.cache.has(index)
    }

    release(image) {
        if (typeof image?.close === 'function') {
            image.close()
        }
    }

    async decode(blob) {
        if (typeof createImageBitmap === 'function') {
            try {
                return await createImageBitmap(blob)
            } catch {
            }
        }

        const url = URL.createObjectURL(blob)

        try {
            const image = new Image()

            image.decoding = 'async'

            await new Promise((resolve, reject) => {
                image.onload = resolve
                image.onerror = reject
                image.src = url
            })

            return image
        } finally {
            URL.revokeObjectURL(url)
        }
    }

    async load(index, signal) {
        const response = await fetch(
            this.getFrameUrl(index),
            { signal }
        )

        if (!response.ok) {
            throw new Error(`Frame ${index}: ${response.status}`)
        }

        const blob = await response.blob()

        if (signal.aborted) {
            throw new DOMException('Aborted', 'AbortError')
        }

        return this.decode(blob)
    }

    trim() {
        if (this.cache.size <= this.cacheLimit) return

        const priorities = new Map(
            [...this.wanted].map((frame, index) => [frame, index])
        )

        const indices = [...this.cache.keys()].sort((a, b) => {
            const priorityA = priorities.get(a) ?? Infinity
            const priorityB = priorities.get(b) ?? Infinity

            if (priorityA !== priorityB) {
                return priorityA > priorityB ? -1 : 1
            }

            return Math.abs(b - this.target) -
                Math.abs(a - this.target)
        })

        while (this.cache.size > this.cacheLimit) {
            const index = indices.shift()

            this.release(this.cache.get(index))
            this.cache.delete(index)
        }
    }

    request(index, direction = 1, velocity = 0, destination = index) {
        if (this.destroyed) return

        this.target = this.clamp(index)
        this.direction = direction < 0 ? -1 : 1

        const speed = Math.abs(velocity)

        const stride = Math.max(
            1,
            Math.min(4, Math.round(speed / 60))
        )

        const predicted = this.clamp(
            this.target +
            this.direction * Math.min(20, speed * 0.12)
        )

        const wanted = new Set()

        const add = frame => {
            if (wanted.size >= this.cacheLimit) return

            wanted.add(this.clamp(frame))
        }

        add(this.target)
        add(this.target + this.direction)
        add(this.target + this.direction * stride)
        add(predicted)
        add(destination)

        for (let i = 1; i <= 4; i++) {
            add(this.target - i * this.direction)
        }

        for (let i = 1; i <= 8; i++) {
            add(this.target + i * this.direction * stride)
        }

        for (let i = 1; i <= this.cacheLimit; i++) {
            add(this.target + i * this.direction)
            add(this.target - i * this.direction)
        }

        this.wanted = wanted

        for (const [frame, controller] of this.pending) {
            if (
                !wanted.has(frame) &&
                Math.abs(frame - this.target) > 12
            ) {
                controller.abort()
            }
        }

        this.rebuildQueue()
        this.trim()
        this.process()
    }

    rebuildQueue() {
        const now = performance.now()

        this.queue = [...this.wanted].filter(
            frame =>
                !this.cache.has(frame) &&
                !this.pending.has(frame) &&
                (this.failed.get(frame) ?? 0) <= now
        )
    }

    process() {
        if (this.destroyed || this.paused) return

        while (
            this.pending.size < this.maxConcurrent &&
            this.queue.length
        ) {
            const index = this.queue.shift()

            if (
                this.cache.has(index) ||
                this.pending.has(index)
            ) {
                continue
            }

            const controller = new AbortController()

            this.pending.set(index, controller)

            this.load(index, controller.signal)
                .then(image => {
                    if (
                        this.destroyed ||
                        controller.signal.aborted
                    ) {
                        this.release(image)
                        return
                    }

                    this.failed.delete(index)
                    this.cache.set(index, image)
                    this.trim()
                })
                .catch(error => {
                    if (
                        !this.destroyed &&
                        !controller.signal.aborted
                    ) {
                        this.failed.set(
                            index,
                            performance.now() + 1500
                        )

                        console.warn(error.message)
                    }
                })
                .finally(() => {
                    this.pending.delete(index)

                    if (this.destroyed) return

                    this.rebuildQueue()
                    this.process()
                })
        }
    }

    pause() {
        this.paused = true
    }

    resume() {
        if (this.destroyed) return

        this.paused = false
    }

    destroy() {
        this.destroyed = true

        for (const controller of this.pending.values()) {
            controller.abort()
        }

        for (const image of this.cache.values()) {
            this.release(image)
        }

        this.cache.clear()
        this.pending.clear()
        this.failed.clear()
        this.wanted.clear()
        this.queue = []
    }
}
