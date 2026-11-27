
import { gsap, ScrollTrigger } from '../core/animation-engine'
import { getMotionProfile } from '../core/motion-profile'

function initMobilePhilosophy(section, images, chapters) {
    const profile = getMotionProfile()

    if (profile.reduced) return

    section.classList.add('is-mobile-cinematic')

    const visual = section.querySelector(
        '[data-philosophy-visual]'
    )

    gsap.set(images, {
        opacity: index => index === 0 ? 1 : 0,
        xPercent: index => index === 0 ? 0 : 12,
        zIndex: index => index + 1
    })

    gsap.set(images.map(image => image.querySelector('img')), {
        scale: 1.2
    })

    chapters.forEach((chapter, index) => {
        const image = images[index]
        const photo = image.querySelector('img')

        gsap.fromTo(photo, {
            scale: 1.2
        }, {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
                trigger: chapter,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7
            }
        })

        if (index > 0) {
            const previous = images[index - 1]

            const transition = gsap.timeline({
                scrollTrigger: {
                    trigger: chapter,
                    start: 'top 85%',
                    end: 'top 25%',
                    scrub: 0.6
                }
            })

            transition
                .fromTo(image, {
                    opacity: 0,
                    xPercent: 12
                }, {
                    opacity: 1,
                    xPercent: 0,
                    duration: 1,
                    ease: 'sine.inOut'
                }, 0)
                .fromTo(previous, {
                    xPercent: 0
                }, {
                    xPercent: -12,
                    duration: 1,
                    ease: 'sine.inOut',
                    immediateRender: false
                }, 0)
        }

        const inner = chapter.querySelector(
            '.philosophy-chapter-inner'
        )

        const words = chapter.querySelectorAll(
            '.philosophy-word > span'
        )

        const label = chapter.querySelector(
            '.philosophy-label'
        )

        const description = chapter.querySelector(
            '.philosophy-description'
        )

        const reveal = gsap.timeline({
            scrollTrigger: {
                trigger: chapter,
                start: 'top 75%',
                end: 'top 25%',
                scrub: 0.6
            }
        })

        reveal
            .fromTo(label, {
                opacity: 0,
                y: 16
            }, {
                opacity: 1,
                y: 0,
                duration: 0.4
            }, 0)
            .fromTo(words, {
                yPercent: 110
            }, {
                yPercent: 0,
                duration: 0.65,
                stagger: 0.04,
                ease: 'power3.out'
            }, 0.1)
            .fromTo(description, {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6
            }, 0.3)

        if (index < chapters.length - 1) {
            gsap.to(inner, {
                opacity: 0,
                y: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: chapter,
                    start: 'bottom 70%',
                    end: 'bottom 35%',
                    scrub: 0.6
                }
            })
        }
    })

    gsap.to(visual, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            start: 'bottom 85%',
            end: 'bottom 25%',
            scrub: 0.6
        }
    })

    return () => {
        section.classList.remove('is-mobile-cinematic')
    }
}

function initDesktopPhilosophy(section, images, chapters) {
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

        images.forEach(image => {
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
            start: 'top center',
            end: 'bottom center',
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
                start: 'top 75%',
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
}

export function initPhilosophy() {
    const section = document.querySelector('[data-philosophy]')

    if (!section) return

    const images = gsap.utils.toArray(
        section.querySelectorAll('[data-philosophy-image]')
    )

    const chapters = gsap.utils.toArray(
        section.querySelectorAll('[data-philosophy-chapter]')
    )

    if (!images.length || images.length !== chapters.length) {
        return
    }

    const mm = gsap.matchMedia()

    mm.add({
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduced: '(prefers-reduced-motion: reduce)'
    }, context => {
        const { mobile, reduced } = context.conditions

        if (mobile) {
            return initMobilePhilosophy(
                section,
                images,
                chapters
            )
        }

        if (!reduced) {
            initDesktopPhilosophy(
                section,
                images,
                chapters
            )
        }
    })

    ScrollTrigger.refresh()
}
