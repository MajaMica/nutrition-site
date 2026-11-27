import {
    gsap,
    ScrollTrigger,
    initAnimationEngine
} from './animation-engine'
import { getMotionProfile } from './motion-profile'

export function initFooter() {
    const footer = document.querySelector('[data-footer]')

    if (!footer) return

    const stage = footer.querySelector('[data-footer-stage]')
    const viewport = footer.querySelector('[data-footer-viewport]')
    const track = footer.querySelector('[data-footer-track]')
    const progress = footer.querySelector('[data-footer-progress]')
    const backTop = footer.querySelector('[data-back-top]')

    const parallax = gsap.utils.toArray(
        '[data-footer-parallax]',
        footer
    )

    const blobs = gsap.utils.toArray(
        '.footer-blob',
        footer
    )

    const { lenis } = initAnimationEngine()

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    )

    backTop?.addEventListener('click', () => {
        if (lenis && !reducedMotion.matches) {
            lenis.scrollTo(0, {
                duration: 1.6,
                force: true
            })
        } else {
            window.scrollTo({
                top: 0,
                behavior: reducedMotion.matches
                    ? 'instant'
                    : 'smooth'
            })
        }

        history.replaceState(
            null,
            '',
            window.location.pathname + window.location.search
        )
    })

    if (footer.dataset.footerHome !== 'true') return

    const chapterLinks = footer.querySelectorAll(
        '[data-footer-chapter]'
    )

    chapterLinks.forEach(link => {
        link.addEventListener('click', event => {
            if (
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) return

            const id = link.dataset.footerChapter

            const headerLink = document.querySelector(
                `[data-nav-link="${id}"]`
            )

            if (!headerLink || !document.getElementById(id)) {
                return
            }

            event.preventDefault()

            headerLink.click()
        })
    })

    const mm = gsap.matchMedia()

    mm.add(
        {
            mobile: '(max-width: 767px)',
            desktop: '(min-width: 768px)',
            tall: '(min-height: 650px)',
            reduced: '(prefers-reduced-motion: reduce)'
        },
        context => {
            const { mobile, tall, reduced } = context.conditions
            const profile = getMotionProfile()

            if (!tall || (mobile ? profile.reduced : reduced)) return
            footer.classList.add('is-cinematic')

            if (mobile) {
                footer.classList.add('is-mobile-cinematic')
            }

            const distance = () => Math.max(
                0,
                track.scrollWidth - viewport.clientWidth
            )

            const timeline = gsap.timeline({
                defaults: {
                    ease: 'none'
                },
                scrollTrigger: {
                    trigger: footer,
                    start: 'top top',
                    end: () => `+=${distance() * (mobile ? 1.35 : 1)}`,
                    pin: stage,
                    scrub: mobile ? .55 : .9,
                    invalidateOnRefresh: true
                }
            })

            timeline.to(track, {
                x: () => -distance(),
                duration: 1
            }, 0)

            timeline.to(progress, {
                scaleX: 1,
                duration: 1
            }, 0)

            timeline.fromTo(parallax, {
                x: index => mobile
                    ? (index === 0 ? 0 : 24)
                    : (index === 0 ? -24 : 60)
            }, {
                x: index => mobile
                    ? (index === 0 ? 20 : 0)
                    : (index === 0 ? 80 : 0),
                duration: 1
            }, 0)

            timeline.to(blobs, {
                x: index => index % 2 === 0
                    ? (mobile ? 45 : 100)
                    : (mobile ? -35 : -80),
                y: index => index % 2 === 0 ? 30 : -30,
                duration: 1
            }, 0)

            if (mobile) {
                const wordmark = footer.querySelector('.footer-wordmark')

                timeline.fromTo(wordmark, {
                    scale: .88,
                    transformOrigin: 'left center'
                }, {
                    scale: 1,
                    duration: .35,
                    ease: 'power2.out'
                }, .65)
            }

            function handleFocus(event) {
                const panel = event.target.closest('.footer-panel')

                if (!panel) return

                const rect = event.target.getBoundingClientRect()

                if (
                    rect.left >= 0 &&
                    rect.right <= window.innerWidth
                ) return

                const trigger = timeline.scrollTrigger
                const total = distance()

                if (!total) return

                const ratio = gsap.utils.clamp(
                    0,
                    1,
                    panel.offsetLeft / total
                )

                const destination =
                    trigger.start +
                    (trigger.end - trigger.start) * ratio

                if (lenis) {
                    lenis.scrollTo(destination, {
                        immediate: true,
                        force: true
                    })
                } else {
                    window.scrollTo({
                        top: destination,
                        behavior: 'instant'
                    })
                }

                ScrollTrigger.update()
                timeline.progress(ratio)
            }

            footer.addEventListener('focusin', handleFocus)

            return () => {
                footer.classList.remove('is-cinematic', 'is-mobile-cinematic')

                footer.removeEventListener(
                    'focusin',
                    handleFocus
                )
            }
        }
    )
}
