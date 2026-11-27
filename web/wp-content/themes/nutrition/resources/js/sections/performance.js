import { gsap, ScrollTrigger } from '../core/animation-engine'

export function initPerformance() {
    const section = document.querySelector('[data-performance]')

    if (!section) return

    const stage = section.querySelector('[data-performance-stage]')
    const track = section.querySelector('[data-performance-track]')
    const panels = gsap.utils.toArray('[data-performance-panel]', section)
    const progress = section.querySelector('[data-performance-progress]')
    const counter = section.querySelector('[data-performance-counter]')

    const mm = gsap.matchMedia()

    mm.add({
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px) and (min-height: 560px)',
        reduced: '(prefers-reduced-motion: reduce)'
    }, context => {
        const { desktop, mobile, reduced } = context.conditions

        if (reduced || (!desktop && !mobile)) return

        section.classList.add('is-cinematic')

        const distance = () =>
            Math.max(0, track.scrollWidth - stage.clientWidth)

        const horizontal = gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${distance() * (mobile ? 1.2 : 1)}`,
                pin: stage,
                scrub: mobile ? 0.5 : 1,
                invalidateOnRefresh: true,
                onUpdate: self => {
                    gsap.set(progress, {
                        scaleX: self.progress
                    })

                    const center = stage.clientWidth / 2

                    let active = 0

                    panels.forEach((panel, index) => {
                        const rect = panel.getBoundingClientRect()

                        if (rect.left <= center) {
                            active = index + 1
                        }
                    })

                    counter.textContent = String(active)
                        .padStart(2, '0')
                }
            }
        })

        panels.forEach(panel => {
            const image = panel.querySelector(
                '[data-performance-image]'
            )

            const number = panel.querySelector(
                '[data-performance-number]'
            )

            gsap.fromTo(
                image,
                { xPercent: mobile ? -2 : -3 },
                {
                    xPercent: mobile ? 2 : 3,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: horizontal,
                        start: 'left right',
                        end: 'right left',
                        scrub: true
                    }
                }
            )

            gsap.fromTo(
                number,
                { xPercent: mobile ? 5 : 12 },
                {
                    xPercent: mobile ? -5 : -12,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: horizontal,
                        start: 'left right',
                        end: 'right left',
                        scrub: true
                    }
                }
            )
        })

        ScrollTrigger.refresh()

        return () => {
            section.classList.remove('is-cinematic')
        }
    })
}