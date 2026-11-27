import { gsap, ScrollTrigger } from '../core/animation-engine'
import { getMotionProfile } from '../core/motion-profile'

function initMobilePerformance(section, stage, track, panels, progress, counter) {
    const intro = track.querySelector('.performance-intro')
    const images = panels.map(panel => panel.querySelector('.performance-image'))
    const copies = panels.map(panel => panel.querySelector('.performance-copy'))
    const numbers = panels.map(panel => panel.querySelector('.performance-number'))

    section.classList.add('is-mobile-editorial')

    const state = { chapter: 0 }

    gsap.set(panels, {
        autoAlpha: 0
    })

    gsap.set(images, {
        xPercent: 105
    })

    gsap.set(copies, {
        autoAlpha: 0,
        y: 24
    })

    gsap.set(numbers, {
        autoAlpha: 0
    })

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${stage.clientHeight * 2.8}`,
            pin: stage,
            scrub: 0.35,
            invalidateOnRefresh: true
        },
        onUpdate: () => {
            gsap.set(progress, {
                scaleX: timeline.progress()
            })

            counter.textContent = String(
                Math.round(state.chapter)
            ).padStart(2, '0')
        }
    })

    timeline.to(intro, {
        autoAlpha: 0,
        y: -24,
        scale: 0.98,
        duration: 0.45,
        ease: 'sine.inOut'
    }, 0.35)

    panels.forEach((panel, index) => {
        const image = images[index]
        const copy = copies[index]
        const number = numbers[index]
        const picture = image.querySelector('img')
        const start = 0.55 + index * 1.15

        timeline.set(panel, {
            autoAlpha: 1
        }, start)

        timeline.to(image, {
            xPercent: 0,
            duration: 0.55,
            ease: 'power2.inOut'
        }, start)

        timeline.fromTo(picture, {
            scale: 1.12,
            xPercent: 3
        }, {
            scale: 1.04,
            xPercent: 0,
            duration: 1.15,
            ease: 'sine.out',
            immediateRender: false
        }, start)

        timeline.to(copy, {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out'
        }, start + 0.2)

        timeline.to(number, {
            autoAlpha: 0.1,
            duration: 0.4
        }, start + 0.2)

        timeline.to(state, {
            chapter: index + 1,
            duration: 0.01
        }, start + 0.3)

        if (index < panels.length - 1) {
            const exit = start + 1.15

            timeline.to(image, {
                xPercent: -105,
                duration: 0.55,
                ease: 'power2.inOut'
            }, exit)

            timeline.to(copy, {
                autoAlpha: 0,
                y: -16,
                duration: 0.25,
                ease: 'sine.in'
            }, exit - 0.1)

            timeline.to(number, {
                autoAlpha: 0,
                duration: 0.25
            }, exit)

            timeline.set(panel, {
                autoAlpha: 0
            }, exit + 0.55)
        }
    })

    return () => {
        section.classList.remove('is-mobile-editorial')
        counter.textContent = '00'
    }
}

function initDesktopPerformance(section, stage, track, panels, progress, counter) {
    section.classList.add('is-cinematic')

    const distance = () =>
        Math.max(0, track.scrollWidth - stage.clientWidth)

    const horizontal = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: stage,
            scrub: 1,
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

        gsap.fromTo(image, {
            xPercent: -3
        }, {
            xPercent: 3,
            ease: 'none',
            scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontal,
                start: 'left right',
                end: 'right left',
                scrub: true
            }
        })

        gsap.fromTo(number, {
            xPercent: 12
        }, {
            xPercent: -12,
            ease: 'none',
            scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontal,
                start: 'left right',
                end: 'right left',
                scrub: true
            }
        })
    })

    return () => {
        section.classList.remove('is-cinematic')
    }
}

export function initPerformance() {
    const section = document.querySelector('[data-performance]')

    if (!section) return

    const stage = section.querySelector('[data-performance-stage]')
    const track = section.querySelector('[data-performance-track]')
    const panels = gsap.utils.toArray('[data-performance-panel]', section)
    const progress = section.querySelector('[data-performance-progress]')
    const counter = section.querySelector('[data-performance-counter]')

    if (!stage || !track || !panels.length || !progress || !counter) return

    const mm = gsap.matchMedia()

    mm.add({
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px) and (min-height: 560px)',
        reduced: '(prefers-reduced-motion: reduce)'
    }, context => {
        const { desktop, mobile, reduced } = context.conditions
        const profile = getMotionProfile()

        if (mobile && !profile.reduced) {
            return initMobilePerformance(
                section,
                stage,
                track,
                panels,
                progress,
                counter
            )
        }

        if (desktop && !reduced) {
            return initDesktopPerformance(
                section,
                stage,
                track,
                panels,
                progress,
                counter
            )
        }
    })

}