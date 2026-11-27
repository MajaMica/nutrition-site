import Lenis from 'lenis'
import { getMotionProfile } from './motion-profile'

export function initSmoothScroll() {
    const profile = getMotionProfile()

    if (!profile.scroll.smooth) {
        return null
    }

    return new Lenis({
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.085,
        wheelMultiplier: 1,
        touchMultiplier: 1,
    })
}