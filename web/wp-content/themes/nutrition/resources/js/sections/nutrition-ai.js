import { gsap, ScrollTrigger } from '../core/animation-engine'

export function initNutritionAI() {
    const section = document.querySelector('[data-nutrition-ai]')

    if (!section) return

    const stage = section.querySelector('[data-ai-stage]')
    const scenes = [...section.querySelectorAll('[data-ai-scene]')]
    const core = section.querySelector('[data-ai-core]')
    const orbits = section.querySelector('[data-ai-orbits]')
    const words = section.querySelectorAll('[data-ai-word]')
    const message = section.querySelector('[data-ai-message]')
    const response = section.querySelector('[data-ai-response]')
    const lines = section.querySelectorAll('.nutrition-ai-lines span')
    const counter = section.querySelector('[data-ai-counter]')
    const progress = section.querySelector('[data-ai-progress]')

    const mm = gsap.matchMedia()

    mm.add(
        '(min-height: 650px) and (prefers-reduced-motion: no-preference)',
        () => {
            section.classList.add('is-cinematic')

            gsap.set(scenes, {
                autoAlpha: 0
            })

            gsap.set(scenes[0], {
                autoAlpha: 1
            })

            gsap.set(core, {
                scale: .35,
                rotation: -60,
                opacity: .35
            })

            gsap.set(orbits, {
                scale: .55,
                opacity: .3
            })

            gsap.set(words, {
                y: 70,
                autoAlpha: 0
            })

            gsap.set([message, response], {
                y: 40,
                autoAlpha: 0
            })

            gsap.set(lines, {
                scaleX: 0
            })

            const timeline = gsap.timeline({
                defaults: {
                    ease: 'none'
                },
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=320%',
                    pin: stage,
                    scrub: 1.1,
                    invalidateOnRefresh: true
                }
            })

            timeline
                .to(core, {
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 1
                }, 0)

                .to(orbits, {
                    scale: 1.1,
                    opacity: .8,
                    duration: 1.5
                }, 0)

                .to(core, {
                    scale: 2.8,
                    rotation: 35,
                    duration: .7
                }, 1.2)

                .to(scenes[0], {
                    autoAlpha: 0,
                    duration: .5
                }, 1.2)

                .to(scenes[1], {
                    autoAlpha: 1,
                    duration: .4
                }, 1.5)

                .to(words, {
                    autoAlpha: 1,
                    y: 0,
                    stagger: .2,
                    duration: .7,
                    ease: 'power2.out'
                }, 1.5)

                .to(orbits, {
                    scale: 1.5,
                    opacity: .35,
                    duration: 2
                }, 1.5)

                .to(scenes[1], {
                    autoAlpha: 0,
                    y: -50,
                    duration: .5
                }, 3)

                .to(scenes[2], {
                    autoAlpha: 1,
                    duration: .4
                }, 3.3)

                .to(message, {
                    autoAlpha: 1,
                    y: 0,
                    duration: .5
                }, 3.5)

                .to(response, {
                    autoAlpha: 1,
                    y: 0,
                    duration: .6
                }, 4.1)

                .to(lines, {
                    scaleX: 1,
                    stagger: .18,
                    duration: .5
                }, 4.5)

                .to(scenes[2], {
                    autoAlpha: 0,
                    y: -40,
                    duration: .5
                }, 5.8)

                .to(scenes[3], {
                    autoAlpha: 1,
                    duration: .8
                }, 6.1)

                .to(orbits, {
                    scale: 2,
                    opacity: .1,
                    duration: 1.5
                }, 6.1)

            timeline.eventCallback('onUpdate', () => {
                const time = timeline.time()

                const chapter =
                    time < 1.5 ? 1 :
                    time < 3.3 ? 2 :
                    time < 6.1 ? 3 : 4

                counter.textContent = String(chapter).padStart(2, '0')

                gsap.set(progress, {
                    scaleX: timeline.progress()
                })
            })

            return () => {
                section.classList.remove('is-cinematic')
            }
        }
    )

    ScrollTrigger.refresh()
}