import { gsap, ScrollTrigger } from './core/animation-engine'
import { FrameSequence } from './engines/frame-sequence'

export async function initHome() {
    const hero = document.querySelector('[data-hero]')

    if (!hero) {
        return
    }

    const stage = hero.querySelector('[data-hero-stage]')
    const canvas = hero.querySelector('[data-hero-canvas]')
    const title = hero.querySelector('[data-hero-title]')
    const indicator = hero.querySelector('.hero-scroll')

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches

    const sequence = new FrameSequence(
        canvas,
        hero.dataset.sequenceUrl,
        {
            cacheLimit: 48,
            preloadRadius: reducedMotion ? 0 : 8,
            maxConcurrent: 6,
        }
    )

    const manifest = await sequence.init()

    if (reducedMotion) {
        indicator.hidden = true
        return
    }

    const titles = [
        'Precision.',
        'Intention.',
        'Balance.',
        'Performance.',
    ]

    const scenes = manifest.scenes
    const playhead = { progress: 0 }

    let activeScene = 0

    function updateSequence() {
        const position = playhead.progress * scenes.length

        const sceneIndex = Math.min(
            Math.floor(position),
            scenes.length - 1
        )

        const scene = scenes[sceneIndex]

        const localProgress = Math.min(
            position - sceneIndex,
            1
        )

        const frame = scene.startFrame + Math.round(
            localProgress * (scene.frameCount - 1)
        )

        sequence.render(frame)

        if (sceneIndex !== activeScene) {
            activeScene = sceneIndex

            gsap.killTweensOf(title)

            title.textContent = titles[sceneIndex]

            gsap.fromTo(
                title,
                {
                    opacity: 0,
                    y: 24,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }
            )
        }
    }

    gsap.to(playhead, {
        progress: 1,
        ease: 'none',
        onUpdate: updateSequence,
        scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '+=500%',
            pin: stage,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                gsap.set(indicator, {
                    opacity: Math.max(
                        0,
                        1 - self.progress * 12
                    ),
                })
            },
        },
    })

    ScrollTrigger.refresh()
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
export function initManifesto() {
    const section = document.querySelector('[data-manifesto]')

    if (!section) return

    if (
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
    ) return

    const lines = section.querySelectorAll(
        '.manifesto-line > span'
    )

    gsap.fromTo(lines, {
        yPercent: 110
    }, {
        yPercent: 0,
        duration: 1.4,
        stagger: 0.18,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: '.manifesto-title',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    })

    section.querySelectorAll('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, {
            opacity: 0,
            y: 32
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        })
    })

    ScrollTrigger.refresh()
}
export function initServices() {
    const section = document.querySelector('[data-services]')

    if (!section) return

    const stage = section.querySelector('[data-services-stage]')
    const track = section.querySelector('[data-services-track]')
    const panels = gsap.utils.toArray(
        section.querySelectorAll('[data-services-panel]')
    )

    const counter = section.querySelector('[data-services-counter]')
    const progress = section.querySelector('[data-services-progress]')

    if (panels.length < 2) return

    const mm = gsap.matchMedia()

    mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
            const horizontal = gsap.to(track, {
                x: () => -(track.scrollWidth - stage.clientWidth),
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${track.scrollWidth - stage.clientWidth}`,
                    pin: stage,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const index = Math.round(
                            self.progress * (panels.length - 1)
                        )

                        counter.textContent = String(
                            index + 1
                        ).padStart(2, '0')

                        gsap.set(progress, {
                            scaleX: self.progress
                        })
                    }
                }
            })

            panels.forEach((panel, index) => {
                const image = panel.querySelector('.services-image img')
                const content = panel.querySelector('.services-content')

                gsap.fromTo(image, {
                    scale: 1.12
                }, {
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: horizontal,
                        start: 'left right',
                        end: 'right left',
                        scrub: true
                    }
                })

                if (index === 0) return

                gsap.fromTo(content, {
                    opacity: 0,
                    x: 80
                }, {
                    opacity: 1,
                    x: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: horizontal,
                        start: 'left 90%',
                        end: 'left 20%',
                        scrub: true
                    }
                })
            })
        }
    )

    ScrollTrigger.refresh()
}
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
export function initJournal() {
    const section = document.querySelector('[data-journal]')

    if (!section) return

    const header = section.querySelector('[data-journal-header]')

    const items = gsap.utils.toArray(
        section.querySelectorAll('[data-journal-item]')
    )

    const mm = gsap.matchMedia()

    mm.add(
        '(prefers-reduced-motion: no-preference)',
        () => {
            gsap.fromTo(
                header.children,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.3,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: header,
                        start: 'center 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )

            items.forEach((item) => {
                const figure = item.querySelector(
                    '[data-journal-figure]'
                )

                const meta = item.querySelector(
                    '.journal-meta'
                )

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 88%',
                        toggleActions: 'play none none reverse'
                    }
                })

                timeline
                    .fromTo(figure, {
                        clipPath: 'inset(12% 0% 12% 0%)',
                        opacity: 0
                    }, {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        opacity: 1,
                        duration: 1.4,
                        ease: 'power3.out'
                    })

                    .fromTo(meta, {
                        opacity: 0,
                        y: 25
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    }, '-=0.6')
            })
        }
    )

    mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
            items.forEach((item, index) => {
                const image = item.querySelector('img')

                const direction = index % 2 === 0 ? 1 : -1

                gsap.fromTo(image, {
                    scale: 1.18,
                    yPercent: -6 * direction
                }, {
                    scale: 1.18,
                    yPercent: 6 * direction,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.2
                    }
                })
            })
        }
    )

    ScrollTrigger.refresh()
}