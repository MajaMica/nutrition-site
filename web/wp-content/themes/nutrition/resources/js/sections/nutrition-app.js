import { gsap, ScrollTrigger } from '../core/animation-engine'

export function initNutritionApp() {
    const section = document.querySelector('[data-nutrition-app]')

    if (!section) return

    const story = section.querySelector('[data-app-story]')
    const stage = section.querySelector('[data-app-stage]')
    const device = section.querySelector('[data-app-device]')
    const counter = section.querySelector('[data-app-counter]')
    const progress = section.querySelector('[data-app-progress]')

    const features = gsap.utils.toArray(
        section.querySelectorAll('[data-app-feature]')
    )

    const screens = gsap.utils.toArray(
        section.querySelectorAll('[data-app-screen]')
    )

    const mm = gsap.matchMedia()

    mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: story,
                    start: 'top top',
                    end: '+=350%',
                    pin: stage,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        gsap.set(progress, {
                            scaleX: self.progress
                        })
                    }
                }
            })

            gsap.set(features, {
                autoAlpha: 0,
                y: 30
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
                rotationY: -18,
                rotationZ: -7,
                scale: 0.92
            })

            timeline.to(device, {
                rotationY: -8,
                rotationZ: -3,
                scale: 1,
                duration: 1,
                ease: 'none'
            })

            for (let index = 1; index < features.length; index++) {
                const position = index
                const direction = index % 2 === 0 ? -1 : 1

                timeline
                    .to(features[index - 1], {
                        autoAlpha: 0,
                        y: -30,
                        duration: 0.3
                    }, position)

                    .fromTo(features[index], {
                        autoAlpha: 0,
                        y: 30
                    }, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.5
                    }, position + 0.3)

                    .to(screens[index], {
                        opacity: 1,
                        duration: 0.5
                    }, position + 0.15)

                    .set(screens[index - 1], {
                        opacity: 0
                    }, position + 0.65)

                    .to(device, {
                        rotationY: direction * 18,
                        rotationZ: direction * 5,
                        duration: 0.8,
                        ease: 'power2.inOut'
                    }, position)
            }

            timeline.to(device, {
                rotationY: 0,
                rotationZ: 0,
                scale: 1.04,
                duration: 0.8
            }, features.length)

            timeline.eventCallback('onUpdate', () => {
                const index = Math.min(
                    Math.max(
                        Math.floor(timeline.time() - 0.3),
                        0
                    ),
                    features.length - 1
                )

                counter.textContent = String(
                    index + 1
                ).padStart(2, '0')
            })
        }
    )

    mm.add(
        '(prefers-reduced-motion: no-preference)',
        () => {
            const intro = section.querySelector(
                '.nutrition-app-intro'
            )

            const introElements = intro.querySelectorAll(
                '.nutrition-app-eyebrow, .nutrition-app-heading, .nutrition-app-lead, .nutrition-app-badge'
            )

            gsap.fromTo(introElements, {
                opacity: 0,
                y: 40
            }, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: intro,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            })

            const ai = section.querySelector(
                '[data-nutrition-ai]'
            )

            gsap.fromTo(
                ai.querySelector('.nutrition-ai-copy'),
                {
                    opacity: 0,
                    y: 40
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ai,
                        start: 'top 60%'
                    }
                }
            )

            const preview = ai.querySelector(
                '.nutrition-ai-preview'
            )

            const lines = ai.querySelectorAll(
                '.nutrition-ai-lines span'
            )

            const aiTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: preview,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            })

            aiTimeline
                .fromTo(preview, {
                    opacity: 0,
                    y: 60,
                    scale: 0.96
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out'
                })

                .fromTo(lines, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: 'power2.out'
                }, '-=0.3')
        }
    )

    ScrollTrigger.refresh()
}
