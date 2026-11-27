
export class DampedPlayhead {
    constructor(options = {}) {
        this.min = options.min ?? 0
        this.max = options.max ?? 1

        this.damping = options.damping ?? 0.16
        this.minDamping = options.minDamping ?? 0.08
        this.maxDamping = options.maxDamping ?? 0.20

        this.maxSpeed = options.maxSpeed ?? 90
        this.boostSpeed = options.boostSpeed ?? 240

        this.velocityDamping = options.velocityDamping ?? 0.09
        this.velocityThreshold = options.velocityThreshold ?? 180
        this.directionDamping = options.directionDamping ?? 0.045
        this.epsilon = options.epsilon ?? 0.01

        this.position = this.min
        this.target = this.min
        this.previousTarget = this.min

        this.velocity = 0
        this.motionVelocity = 0
        this.direction = 1
        this.currentDamping = this.damping
    }

    clamp(value) {
        return Math.max(this.min, Math.min(this.max, value))
    }

    setTarget(value) {
        if (Number.isFinite(value)) {
            this.target = this.clamp(value)
        }
    }

    update(deltaTime) {
        if (!Number.isFinite(deltaTime)) return this.position

        const dt = Math.max(0, Math.min(deltaTime, 0.05))

        if (!dt) return this.position

        const rawVelocity =
            (this.target - this.previousTarget) / dt

        this.previousTarget = this.target

        const velocityFactor =
            1 - Math.exp(-dt / this.velocityDamping)

        this.velocity +=
            (rawVelocity - this.velocity) * velocityFactor

        const difference = this.target - this.position

        if (Math.abs(difference) <= this.epsilon) {
            this.position = this.target
            this.motionVelocity = 0

            return this.position
        }

        const response = Math.min(
            1,
            Math.max(
                Math.abs(this.velocity) / this.velocityThreshold,
                Math.abs(difference) / 24
            )
        )

        const desiredDamping =
            this.maxDamping -
            (this.maxDamping - this.minDamping) * response

        this.currentDamping +=
            (desiredDamping - this.currentDamping) *
            velocityFactor

        const speed =
            this.maxSpeed +
            (this.boostSpeed - this.maxSpeed) * response

        const factor =
            1 - Math.exp(-dt / this.currentDamping)

        const desiredVelocity = Math.max(
            -speed,
            Math.min(speed, difference * factor / dt)
        )

        const directionFactor =
            1 - Math.exp(-dt / this.directionDamping)

        this.motionVelocity +=
            (desiredVelocity - this.motionVelocity) *
            directionFactor

        let step = this.motionVelocity * dt

        if (step * difference < 0) {
            step = 0
        }

        if (Math.abs(step) >= Math.abs(difference)) {
            step = difference
            this.motionVelocity = 0
        }

        if (step !== 0) {
            this.direction = step < 0 ? -1 : 1
        }

        this.position = this.clamp(this.position + step)

        return this.position
    }

    snap(value) {
        if (!Number.isFinite(value)) return

        const next = this.clamp(value)

        if (next !== this.position) {
            this.direction = next < this.position ? -1 : 1
        }

        this.position = next
        this.target = next
        this.previousTarget = next

        this.velocity = 0
        this.motionVelocity = 0
        this.currentDamping = this.damping
    }

    get frame() {
        return Math.round(this.position)
    }

    get settled() {
        return Math.abs(this.target - this.position) <= this.epsilon
    }
}
