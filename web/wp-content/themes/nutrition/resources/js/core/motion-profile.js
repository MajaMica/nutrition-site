
const touchQuery = window.matchMedia(
    '(pointer: coarse)'
)

const mobileQuery = window.matchMedia(
    '(max-width: 767px)'
)

const motionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
)

export function getMotionProfile() {
    const touch = touchQuery.matches
    const mobile = mobileQuery.matches
    const reduced = false

    return {
        touch,
        mobile,
        reduced,

        mode: reduced ? 'calm' : 'cinematic',

        scroll: {
            native: touch || reduced,
            smooth: !touch && !reduced,
        },

        hero: {
            mobileSequence: mobile,
            sticky: mobile,
            scrollDistance: mobile ? 2.5 : 5,
            maxDpr: mobile ? 1.5 : 2,

            damping: mobile ? 0.16 : 0.12,
            minDamping: 0.08,
            maxDamping: 0.20,

            maxFrameSpeed: reduced ? 30 : 90,
            boostFrameSpeed: reduced ? 30 : 240,

            velocityDamping: 0.09,
            velocityThreshold: 180,
            directionDamping: 0.045,

            sceneTransition: 180,
            titleDuration: 650,
            entranceDuration: 850,

            cacheLimit: mobile ? 24 : 48,
            maxConcurrent: mobile ? 3 : 6,
        },

        effects: {
            parallax: !reduced,
            rotation: !reduced,
            scale: !reduced,
            ambient: !reduced,
            transitions: !reduced,
        },
    }
}
