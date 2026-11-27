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
            gsap.from(media, {
                clipPath: 'inset(15% 0% 15% 0%)',
                opacity: .5,
                ease: 'none',
                scrollTrigger: {
                    trigger: media,
                    start: 'top 95%',
                    end: 'center 55%',
                    scrub: 1
                }
            })

            ;[eyebrow, mark, first, second, author].forEach(element => {
                gsap.from(element, {
                    y: 32,
                    opacity: 0,
                    duration: .9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 90%',
                        once: true
                    }
                })
            })
        }
    )

    ScrollTrigger.refresh()
}