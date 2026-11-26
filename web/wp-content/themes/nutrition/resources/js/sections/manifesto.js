import { gsap, ScrollTrigger } from '../core/animation-engine'

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
