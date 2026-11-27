import { gsap, ScrollTrigger } from '../core/animation-engine'

export function initChefNote() {
    const section = document.querySelector('[data-chef-note]')

    if (!section) return

    const media = section.querySelector('[data-note-media]')
    const image = section.querySelector('[data-note-image]')
    const watermark = section.querySelector('[data-note-watermark]')
    const eyebrow = section.querySelector('[data-note-eyebrow]')
    const mark = section.querySelector('[data-note-mark]')
    const first = section.querySelector('[data-note-first]')
    const second = section.querySelector('[data-note-second]')
    const author = section.querySelector('[data-note-author]')

    const mm = gsap.matchMedia()

    mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
            const timeline = gsap.timeline({
                defaults: {
                    ease: 'none'
                },
                scrollTrigger: {
                    trigger: section,
                    start: 'top 95%',
                    end: 'top 5%',
                    scrub: 1.2,
                    invalidateOnRefresh: true
                }
            })

            timeline
                .fromTo(media, {
                    clipPath: 'inset(0% 0% 0% 100%)',
                    opacity: .4
                }, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    opacity: 1,
                    duration: .65
                }, 0)

                .fromTo(watermark, {
                    xPercent: 12,
                    opacity: 0
                }, {
                    xPercent: 0,
                    opacity: 1,
                    duration: 1
                }, 0)

                .fromTo(eyebrow, {
                    y: 24,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: .25
                }, .2)

                .fromTo(mark, {
                    y: 30,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: .75,
                    duration: .3
                }, .3)

                .fromTo(first, {
                    yPercent: 105,
                    opacity: 0
                }, {
                    yPercent: 0,
                    opacity: 1,
                    duration: .4
                }, .35)

                .fromTo(second, {
                    yPercent: 105,
                    opacity: 0
                }, {
                    yPercent: 0,
                    opacity: 1,
                    duration: .3
                }, .6)

                .fromTo(author, {
                    y: 24,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: .25
                }, .75)

            gsap.fromTo(image, {
                scale: 1.14,
                yPercent: -3
            }, {
                scale: 1.02,
                yPercent: 3,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                    invalidateOnRefresh: true
                }
            })
        }
    )

    mm.add(
        '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        () => {
            gsap.fromTo(image, {
                scale: 1.12,
                yPercent: -2
            }, {
                scale: 1.02,
                yPercent: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.45,
                    invalidateOnRefresh: true
                }
            })

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section.querySelector('.chef-note-copy'),
                    start: 'top 95%',
                    end: 'top 25%',
                    scrub: 0.4,
                    invalidateOnRefresh: true
                }
            })

            timeline
                .fromTo(eyebrow, {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.25,
                    ease: 'sine.out'
                }, 0)

                .fromTo(mark, {
                    opacity: 0,
                    y: 16
                }, {
                    opacity: 0.65,
                    y: 0,
                    duration: 0.3,
                    ease: 'sine.out'
                }, 0.1)

                .fromTo(first, {
                    opacity: 0,
                    yPercent: 35
                }, {
                    opacity: 1,
                    yPercent: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                }, 0.15)

                .fromTo(second, {
                    opacity: 0,
                    yPercent: 30
                }, {
                    opacity: 1,
                    yPercent: 0,
                    duration: 0.35,
                    ease: 'power2.out'
                }, 0.35)

                .fromTo(author, {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.25,
                    ease: 'sine.out'
                }, 0.55)
        }
    )

    ScrollTrigger.refresh()
}
