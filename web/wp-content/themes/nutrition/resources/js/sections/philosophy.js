import { gsap, ScrollTrigger } from '../core/animation-engine'

export function initPhilosophy() {
    const section = document.querySelector('[data-philosophy]')

    if (!section) return

    const images = gsap.utils.toArray(
        section.querySelectorAll('[data-philosophy-image]')
    )

    const chapters = gsap.utils.toArray(
        section.querySelectorAll('[data-philosophy-chapter]')
    )

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) return

    const mm = gsap.matchMedia()

    mm.add({
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)'
    }, (context) => {
        const { mobile } = context.conditions

        let activeIndex = 0

        gsap.set(images, {
            opacity: 0,
            zIndex: 0
        })

        gsap.set(images[0], {
            opacity: 1,
            zIndex: 1
        })

        function changeImage(index) {
            if (index === activeIndex) return

            const previous = images[activeIndex]
            const next = images[index]

            gsap.killTweensOf(images)

            images.forEach((image) => {
                if (image !== previous && image !== next) {
                    gsap.set(image, {
                        opacity: 0,
                        zIndex: 0
                    })
                }
            })

            gsap.set(previous, {
                opacity: 1,
                zIndex: 1
            })

            gsap.set(next, {
                opacity: 0,
                zIndex: 2
            })

            gsap.to(next, {
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set(previous, {
                        opacity: 0,
                        zIndex: 0
                    })
                }
            })

            activeIndex = index
        }

        chapters.forEach((chapter, index) => {
            const words = chapter.querySelectorAll(
                '.philosophy-word > span'
            )

            const label = chapter.querySelector(
                '.philosophy-label'
            )

            const description = chapter.querySelector(
                '.philosophy-description'
            )

            const image = images[index].querySelector('img')

            ScrollTrigger.create({
                trigger: chapter,
                start: mobile ? 'top 75%' : 'top center',
                end: mobile ? 'bottom 75%' : 'bottom center',
                onEnter: () => changeImage(index),
                onEnterBack: () => changeImage(index)
            })

            gsap.fromTo(image, {
                scale: 1.12
            }, {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: chapter,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.2
                }
            })

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: chapter,
                    start: mobile ? 'top 85%' : 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            })

            timeline
                .fromTo(label, {
                    opacity: 0,
                    y: 16
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                })
                .fromTo(words, {
                    yPercent: 115
                }, {
                    yPercent: 0,
                    duration: 1,
                    stagger: 0.09,
                    ease: 'power4.out'
                }, '-=0.3')
                .fromTo(description, {
                    opacity: 0,
                    y: 24
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.5')
        })
    })

    ScrollTrigger.refresh()
}
