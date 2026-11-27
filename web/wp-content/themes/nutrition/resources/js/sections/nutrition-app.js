import { getMotionProfile } from '../core/motion-profile'
import { gsap, ScrollTrigger } from '../core/animation-engine'

export function initNutritionApp() {
    const section = document.querySelector('[data-nutrition-app]')

    if (!section) return

    const story = section.querySelector('[data-app-story]')
    const stage = section.querySelector('[data-app-stage]')
    const device = section.querySelector('[data-app-device]')
    const counter = section.querySelector('[data-app-counter]')
    const progress = section.querySelector('[data-app-progress]')
    const watermark = section.querySelector('[data-app-watermark]')
    const orbit = section.querySelector('.nutrition-app-orbit')

    const features = gsap.utils.toArray(
        section.querySelectorAll('[data-app-feature]')
    )

    const screens = gsap.utils.toArray(
        section.querySelectorAll('[data-app-screen]')
    )

    const mm = gsap.matchMedia()

    mm.add(
        '(min-width: 768px) and (min-height: 601px) and (prefers-reduced-motion: no-preference)',
        () => {
            gsap.set(features, {
                autoAlpha: 0,
                y: 40
            })

            gsap.set(features[0], {
                autoAlpha: 1,
                y: 0
            })

            gsap.set(screens, {
                opacity: 0
            })

            gsap.set(screens[0], {
                opacity: 1
            })

            gsap.set(device, {
                rotationY: -25,
                rotationZ: -12,
                scale: .88
            })

            gsap.fromTo(features[0].children, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: .08,
                ease: 'none',
                scrollTrigger: {
                    trigger: story,
                    start: 'top 95%',
                    end: 'top 5%',
                    scrub: 1
                }
            })

            gsap.fromTo(device, {
                xPercent: 35,
                autoAlpha: 0
            }, {
                xPercent: 0,
                autoAlpha: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: story,
                    start: 'top 95%',
                    end: 'top 5%',
                    scrub: 1
                }
            })

            const timeline = gsap.timeline({
                defaults: {
                    ease: 'none'
                },
                scrollTrigger: {
                    trigger: story,
                    start: 'top top',
                    end: '+=400%',
                    pin: stage,
                    scrub: 1.2,
                    invalidateOnRefresh: true
                }
            })

            timeline.to(device, {
                rotationY: -8,
                rotationZ: -3,
                scale: 1,
                duration: 1
            }, 0)

            for (let index = 1; index < features.length; index++) {
                const position = index
                const direction = index % 2 === 0 ? -1 : 1

                timeline
                    .to(features[index - 1], {
                        autoAlpha: 0,
                        y: -40,
                        duration: .3
                    }, position)

                    .to(features[index], {
                        autoAlpha: 1,
                        y: 0,
                        duration: .5
                    }, position + .3)

                    .to(device, {
                        rotationY: direction * 18,
                        rotationZ: direction * 5,
                        scale: 1,
                        duration: .8,
                        ease: 'power2.inOut'
                    }, position)

                if (index > 1) {
                    timeline
                        .to(screens[index - 2], {
                            opacity: 0,
                            duration: .5
                        }, position + .15)

                        .to(screens[index - 1], {
                            opacity: 1,
                            duration: .5
                        }, position + .15)
                }
            }

            timeline.to(device, {
                rotationY: 0,
                rotationZ: 0,
                scale: 1.04,
                duration: .8
            }, features.length)

            const duration = timeline.duration()

            timeline.to(watermark, {
                x: -100,
                duration
            }, 0)

            timeline.to(orbit, {
                rotation: 45,
                scale: 1.12,
                duration
            }, 0)

            timeline.eventCallback('onUpdate', () => {
                const index = Math.min(
                    Math.max(
                        Math.floor(timeline.time() - .3),
                        0
                    ),
                    features.length - 1
                )

                counter.textContent = String(index).padStart(2, '0')

                gsap.set(progress, {
                    scaleX: timeline.progress()
                })
            })
        }
    )


    mm.add(
        '(max-width: 767px) and (min-height: 640px)',
        () => {
            if (getMotionProfile().reduced) return

            section.classList.add('is-mobile-cinematic')

            gsap.set(features, {
                autoAlpha: 0,
                y: 18
            })

            gsap.set(features[0], {
                autoAlpha: 1,
                y: 0
            })

            gsap.set(screens, {
                autoAlpha: 0
            })

            gsap.set(screens[0], {
                autoAlpha: 1
            })

            gsap.set(device, {
                rotationY: -14,
                rotationZ: -7,
                scale: .9,
                y: 8
            })

            const timeline = gsap.timeline({
                defaults: {
                    ease: 'sine.inOut'
                },
                scrollTrigger: {
                    trigger: story,
                    start: 'top top',
                    end: '+=280%',
                    pin: stage,
                    scrub: .45,
                    invalidateOnRefresh: true
                }
            })

            timeline.to(device, {
                rotationY: -4,
                rotationZ: -2,
                scale: 1,
                y: 0,
                duration: .8
            }, 0)

            for (let index = 1; index < features.length; index++) {
                const position = index - .2
                const direction = index % 2 === 0 ? -1 : 1

                timeline
                    .to(features[index - 1], {
                        autoAlpha: 0,
                        y: -18,
                        duration: .24
                    }, position)

                    .fromTo(features[index], {
                        autoAlpha: 0,
                        y: 18
                    }, {
                        autoAlpha: 1,
                        y: 0,
                        duration: .34,
                        immediateRender: false
                    }, position + .24)

                    .to(device, {
                        rotationY: direction * 10,
                        rotationZ: direction * 4,
                        scale: 1.015,
                        y: -4,
                        duration: .55
                    }, position)

                if (index > 1) {
                    timeline
                        .to(screens[index - 2], {
                            autoAlpha: 0,
                            duration: .28
                        }, position + .12)

                        .to(screens[index - 1], {
                            autoAlpha: 1,
                            duration: .28
                        }, position + .12)
                }
            }

            timeline.to(device, {
                rotationY: 0,
                rotationZ: 0,
                scale: 1,
                y: 0,
                duration: .5
            }, features.length - .5)

            const duration = timeline.duration()

            timeline
                .to(watermark, {
                    x: -36,
                    duration,
                    ease: 'none'
                }, 0)

                .to(orbit, {
                    rotation: 30,
                    scale: 1.08,
                    duration,
                    ease: 'none'
                }, 0)

                .to(progress, {
                    scaleX: 1,
                    duration,
                    ease: 'none'
                }, 0)

            timeline.eventCallback('onUpdate', () => {
                const index = Math.min(
                    Math.max(
                        Math.floor(timeline.time() + .06),
                        0
                    ),
                    features.length - 1
                )

                counter.textContent = String(index).padStart(2, '0')
            })

            return () => {
                section.classList.remove('is-mobile-cinematic')
                counter.textContent = '00'
            }
        }
    )

    ScrollTrigger.refresh()
}
