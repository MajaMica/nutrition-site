import { gsap, ScrollTrigger } from '../core/animation-engine'
import { getMotionProfile } from '../core/motion-profile'

export function initJournal() {
    const section = document.querySelector('[data-journal]')

    if (!section) return

    const header = section.querySelector('[data-journal-header]')

    const items = gsap.utils.toArray(
        section.querySelectorAll('[data-journal-card]')
    )

    if (!header || !items.length) return

    const mm = gsap.matchMedia()

    mm.add(
        '(prefers-reduced-motion: no-preference)',
        () => {
            if (window.matchMedia('(max-width: 767px)').matches) return

            gsap.fromTo(header.children, {
                opacity: 0,
                y: 40
            }, {
                opacity: 1,
                y: 0,
                duration: 1.3,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'center 85%',
                    toggleActions: 'play none none reverse'
                }
            })
        }
    )

    mm.add(
        '(min-width: 768px) and (min-height: 601px) and (prefers-reduced-motion: no-preference)',
        () => {
            items.forEach((item, index) => {
                const card = item.querySelector(
                    '[data-journal-card-inner]'
                )

                const image = card.querySelector('img')

                const next = items[index + 1]

                gsap.fromTo(image, {
                    scale: 1.08
                }, {
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: 'top 30%',
                        scrub: 1.2,
                        invalidateOnRefresh: true
                    }
                })

                if (!next) return

                gsap.to(card, {
                    scale: 0.94,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: next,
                        start: 'top 90%',
                        end: 'top 30%',
                        scrub: 1,
                        invalidateOnRefresh: true
                    }
                })
            })
        }
    )

    mm.add({
        mobile: '(max-width: 767px)',
        tall: '(min-height: 601px)',
        reduced: '(prefers-reduced-motion: reduce)'
    }, context => {
        const { mobile, tall } = context.conditions
        const profile = getMotionProfile()

        if (!mobile || !tall || profile.reduced) return

        section.classList.add('is-mobile-cinematic')

        gsap.fromTo(header.children, {
            y: 24
        }, {
            y: 0,
            stagger: .12,
            ease: 'none',
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                end: 'center 45%',
                scrub: .6
            }
        })

        items.forEach((item, index) => {
            const card = item.querySelector('[data-journal-card-inner]')
            const image = card?.querySelector('img')
            const next = items[index + 1]

            if (!card || !image) return

            gsap.fromTo(image, {
                scale: 1.06
            }, {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'top 25%',
                    scrub: .65,
                    invalidateOnRefresh: true
                }
            })

            if (!next) return

            gsap.to(card, {
                scale: .96,
                ease: 'none',
                scrollTrigger: {
                    trigger: next,
                    start: 'top 85%',
                    end: 'top 20%',
                    scrub: .85,
                    invalidateOnRefresh: true
                }
            })

            gsap.to(card, {
                '--journal-shade': .22,
                ease: 'none',
                scrollTrigger: {
                    trigger: next,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: .85
                }
            })
        })

        return () => {
            section.classList.remove('is-mobile-cinematic')
        }
    })

    ScrollTrigger.refresh()
}
