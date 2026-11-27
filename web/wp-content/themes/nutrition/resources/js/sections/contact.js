import {
    gsap,
    ScrollTrigger,
    initAnimationEngine
} from '../core/animation-engine'

export function initContact() {
    const section = document.querySelector('[data-contact]')

    if (!section) return

    const stage = section.querySelector('[data-contact-stage]')
    const scenes = gsap.utils.toArray('[data-contact-scene]', section)
    const rings = gsap.utils.toArray('[data-contact-ring]', section)
    const links = gsap.utils.toArray('[data-contact-link]', section)
    const counter = section.querySelector('[data-contact-counter]')
    const progress = section.querySelector('[data-contact-progress]')

    const { lenis } = initAnimationEngine()

    const mm = gsap.matchMedia()

    mm.add(
        '(min-width: 768px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)',
        () => {
            section.classList.add('is-cinematic')

            const interval = 1.6
            const duration = scenes.length * interval

            let active = -1

            gsap.set(scenes, {
                autoAlpha: 0,
                y: 60,
                scale: .96
            })

            gsap.set(scenes[0], {
                autoAlpha: 1,
                y: 0,
                scale: 1
            })

            gsap.set(rings, {
                rotation: index => index * 45
            })

            function updateActive(index) {
                if (active === index) return

                active = index

                scenes.forEach((scene, i) => {
                    scene.inert = i !== index
                })

                counter.textContent = String(index + 1).padStart(2, '0')

                links.forEach(link => {
                    const selected =
                        Number(link.dataset.contactLink) === index

                    link.classList.toggle('is-active', selected)

                    if (selected) {
                        link.setAttribute('aria-current', 'true')
                    } else {
                        link.removeAttribute('aria-current')
                    }
                })
            }

            const timeline = gsap.timeline({
                defaults: {
                    ease: 'none'
                },
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * scenes.length * .48}`,
                    pin: stage,
                    scrub: .8,
                    invalidateOnRefresh: true
                }
            })

            scenes.forEach((scene, index) => {
                if (index === 0) return

                const time = index * interval

                timeline
                    .to(scenes[index - 1], {
                        autoAlpha: 0,
                        y: -60,
                        scale: 1.04,
                        duration: .45
                    }, time - .45)

                    .to(scene, {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: .65,
                        ease: 'power2.out'
                    }, time)
            })

            timeline.to(rings, {
                rotation: index => index % 2 === 0
                    ? 180 + index * 45
                    : -180 + index * 45,
                scale: index => 1 + index * .045,
                duration
            }, 0)

            timeline.to(progress, {
                scaleX: 1,
                duration
            }, 0)

            timeline.eventCallback('onUpdate', () => {
                const index = gsap.utils.clamp(
                    0,
                    scenes.length - 1,
                    Math.floor(timeline.time() / interval)
                )

                updateActive(index)
            })

            function selectChannel(event) {
                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey
                ) return

                const index = Number(
                    event.currentTarget.dataset.contactLink
                )

                if (index === active) return

                event.preventDefault()

                const trigger = timeline.scrollTrigger

                const ratio = Math.min(
                    1,
                    (index * interval + .7) / duration
                )

                const destination =
                    trigger.start +
                    (trigger.end - trigger.start) * ratio

                if (lenis) {
                    lenis.scrollTo(destination, {
                        duration: .9,
                        force: true
                    })
                } else {
                    window.scrollTo({
                        top: destination,
                        behavior: 'smooth'
                    })
                }
            }

            links.forEach(link => {
                link.addEventListener('click', selectChannel)
            })

            updateActive(0)

            return () => {
                section.classList.remove('is-cinematic')

                scenes.forEach(scene => {
                    scene.inert = false
                })

                links.forEach(link => {
                    link.removeEventListener('click', selectChannel)
                    link.classList.remove('is-active')
                    link.removeAttribute('aria-current')
                })
            }
        }
    )

    ScrollTrigger.refresh()
}