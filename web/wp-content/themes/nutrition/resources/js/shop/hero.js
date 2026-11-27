import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initHero() {
    const hero = document.querySelector('[data-ed-hero]')

    if (!hero) return

    const copy = hero.querySelector('[data-ed-hero-copy]')
    const visual = hero.querySelector('[data-ed-hero-visual]')
    const book = hero.querySelector('[data-ed-book]')
    const progress = hero.querySelector('[data-ed-hero-progress]')
    const shadow = hero.querySelector('.ed-hero-shadow')
    const orbit = hero.querySelector('.ed-hero-orbit')
    const watermark = hero.querySelector('.ed-hero-watermark')
    const ambient = hero.querySelectorAll('.ed-hero-ambient span')

    const mm = gsap.matchMedia()

    mm.add({
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduced: '(prefers-reduced-motion: reduce)',
    }, ({ conditions }) => {
        const { mobile, reduced } = conditions

        if (reduced) return

        if (copy) {
            gsap.from(copy.children, {
                y: mobile ? 14 : 35,
                opacity: 0,
                duration: .75,
                stagger: .1,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
            })
        }

        if (book && visual) {
            gsap.set(book, {
                rotationY: -24,
                rotationZ: -8,
            })

            const timeline = gsap.timeline({
                defaults: {
                    ease: 'none',
                },
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: mobile ? .45 : .8,
                    invalidateOnRefresh: true,
                },
            })

            timeline.to(book, {
                rotationY: mobile ? 12 : 28,
                rotationZ: mobile ? 2 : 5,
                scale: mobile ? 1.04 : 1.12,
            }, 0)

            timeline.to(visual, {
                y: mobile ? -18 : -85,
            }, 0)

            if (shadow) {
                timeline.to(shadow, {
                    scaleX: .75,
                    opacity: .14,
                }, 0)
            }

            if (orbit) {
                timeline.to(orbit, {
                    scale: mobile ? 1.06 : 1.2,
                    opacity: .4,
                }, 0)
            }

            if (watermark) {
                timeline.to(watermark, {
                    xPercent: mobile ? -5 : -12,
                }, 0)
            }

            if (ambient.length) {
                timeline.to(ambient, {
                    xPercent: mobile ? -5 : -15,
                    yPercent: -10,
                }, 0)
            }
        }

        if (progress) {
            gsap.to(progress, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        }
    })

    return () => mm.revert()
}