import { gsap } from './animation-engine'

export function initOrganicBackgrounds() {
    const backgrounds = document.querySelectorAll(
        '[data-organic-background]'
    )

    if (
        !backgrounds.length ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        return
    }

    const motions = [
        { xPercent: -28, yPercent: 35, rotation: 45, scale: 1.15 },
        { xPercent: 32, yPercent: -28, rotation: -40, scale: 1.2 },
        { xPercent: -25, yPercent: -35, rotation: 35, scale: 1.1 },
        { xPercent: 30, yPercent: -25, rotation: -45, scale: 1.15 }
    ]

    backgrounds.forEach((background) => {
        const surface = background.closest('.organic-surface')

        if (!surface) return

        const trigger = surface.closest('[data-app-story]') || surface
        const blobs = background.querySelectorAll('[data-organic-blob]')

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.8,
                invalidateOnRefresh: true
            }
        })

        blobs.forEach((blob, index) => {
            timeline.to(blob, {
                ...motions[index % motions.length],
                ease: 'none',
                duration: 1
            }, 0)
        })
    })
}