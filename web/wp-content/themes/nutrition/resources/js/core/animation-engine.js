import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSmoothScroll } from './smooth-scroll'
import { getMotionProfile } from './motion-profile'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let initialized = false

export function initAnimationEngine() {
    if (initialized) {
        return { gsap, ScrollTrigger, lenis }
    }

    const profile = getMotionProfile()

    if (profile.touch) {
        ScrollTrigger.config({
            ignoreMobileResize: true,
        })
    }

    lenis = initSmoothScroll()

    if (lenis) {
        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)
    }

    initialized = true

    return { gsap, ScrollTrigger, lenis }
}

export { gsap, ScrollTrigger }