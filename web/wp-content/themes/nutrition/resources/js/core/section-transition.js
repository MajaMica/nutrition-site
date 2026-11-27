import { gsap, ScrollTrigger } from './animation-engine'

export function initSectionTransitions() {
    const sections = document.querySelectorAll(
        '[data-section-transition]'
    )

    if (!sections.length) return

    const mm = gsap.matchMedia()

    mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
            sections.forEach(section => {
                const source = document.querySelector(
                    section.dataset.sectionTransition
                )

                if (!source) return

                if (
                    source.matches('[data-services]') ||
                    source.matches('[data-app-story]') || source.matches('[data-nutrition-ai]')
                ) {
                    return
                }

                gsap.to(source, {
                    y: () => Math.min(
                        window.innerHeight * 0.22,
                        220
                    ),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                })
            })

            ScrollTrigger.refresh()
        }
    )
}