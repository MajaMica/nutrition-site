import { gsap, ScrollTrigger } from '../core/animation-engine'
import { getMotionProfile } from '../core/motion-profile'

export function initLibrary() {
    const section = document.querySelector('[data-library]')

    if (!section) return

    const stage = section.querySelector('[data-library-stage]')
    const intro = section.querySelector('[data-library-intro]')
    const area = section.querySelector('[data-library-book-area]')
    const book = section.querySelector('[data-library-book]')
    const details = section.querySelector('[data-library-details]')
    const watermark = section.querySelector('[data-library-watermark]')
    const progress = section.querySelector('[data-library-progress]')

    const mm = gsap.matchMedia()

    mm.add(
        '(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)',
        () => {
            section.classList.add('is-cinematic')

            gsap.set(area, {
                autoAlpha: 0
            })

            gsap.set(book, {
                rotationY: -65,
                rotationZ: -18,
                rotationX: 12,
                scale: .45,
                y: 140
            })

            gsap.set(details, {
                autoAlpha: 0,
                x: 70
            })

            const timeline = gsap.timeline({
                defaults: {
                    ease: 'none'
                },
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=240%',
                    pin: stage,
                    scrub: 1.2,
                    invalidateOnRefresh: true
                }
            })

            timeline
                .from(intro.children, {
                    y: 60,
                    autoAlpha: 0,
                    stagger: .2,
                    duration: .8
                }, 0)

                .to(intro, {
                    y: -100,
                    scale: .95,
                    autoAlpha: 0,
                    duration: .7
                }, 1.4)

                .to(area, {
                    autoAlpha: 1,
                    duration: .6
                }, 1.6)

                .to(book, {
                    rotationY: -25,
                    rotationZ: -7,
                    rotationX: 0,
                    scale: 1.15,
                    y: 0,
                    duration: 1.4,
                    ease: 'power2.out'
                }, 1.6)

                .to(book, {
                    rotationY: 15,
                    rotationZ: 4,
                    duration: 1.1
                }, 3)

                .to(area, {
                    x: () => -window.innerWidth * .25,
                    duration: 1.2,
                    ease: 'power2.inOut'
                }, 4.1)

                .to(book, {
                    rotationY: -18,
                    rotationZ: -5,
                    scale: 1,
                    duration: 1.2
                }, 4.1)

                .to(details, {
                    x: 0,
                    autoAlpha: 1,
                    duration: .9
                }, 4.5)

                .to(watermark, {
                    x: -120,
                    duration: 6.5
                }, 0)

                .to(progress, {
                    scaleX: 1,
                    duration: 6.5
                }, 0)

            return () => {
                section.classList.remove('is-cinematic')
            }
        }
    )


    mm.add({
        mobile: '(max-width: 767px)',
        tall: '(min-height: 640px)',
        reduced: '(prefers-reduced-motion: reduce)'
    }, context => {
        const { mobile, tall } = context.conditions
        const profile = getMotionProfile()

        if (!mobile || !tall || profile.reduced) return

        section.classList.add('is-mobile-cinematic')

        gsap.set(area, {
            autoAlpha: 0
        })

        gsap.set(book, {
            rotationY: -55,
            rotationX: 10,
            rotationZ: -12,
            scale: .45,
            y: 70
        })

        gsap.set(details, {
            autoAlpha: 0,
            y: 30
        })

        const timeline = gsap.timeline({
            defaults: {
                ease: 'none'
            },
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=220%',
                pin: stage,
                scrub: .75,
                invalidateOnRefresh: true
            }
        })

        timeline
            .fromTo(intro.children, {
                y: 20
            }, {
                y: 0,
                stagger: .1,
                duration: .6
            }, 0)

            .to(intro, {
                y: -50,
                autoAlpha: 0,
                scale: .96,
                duration: .65,
                ease: 'sine.inOut'
            }, .8)

            .to(area, {
                autoAlpha: 1,
                duration: .6
            }, .95)

            .to(book, {
                rotationY: -18,
                rotationX: 0,
                rotationZ: -5,
                scale: 1,
                y: 0,
                duration: 1.35,
                ease: 'power2.out'
            }, .95)

            .to(book, {
                rotationY: 14,
                rotationZ: 3,
                duration: .85,
                ease: 'sine.inOut'
            }, 2.3)

            .to(area, {
                y: () => -stage.clientHeight * .19,
                duration: 1,
                ease: 'power2.inOut'
            }, 3.15)

            .to(book, {
                rotationY: -12,
                rotationZ: -3,
                scale: .78,
                duration: 1,
                ease: 'power2.inOut'
            }, 3.15)

            .to(details, {
                autoAlpha: 1,
                y: 0,
                duration: .85,
                ease: 'power2.out'
            }, 3.65)

            .to(watermark, {
                x: -45,
                duration: 5.2
            }, 0)

            .to(progress, {
                scaleX: 1,
                duration: 5.2
            }, 0)

        return () => {
            section.classList.remove('is-mobile-cinematic')
        }
    })

}
