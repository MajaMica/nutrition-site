import { gsap, ScrollTrigger } from './animation-engine'
import { getMotionProfile } from './motion-profile'

const transitions = [
    {
        target: '[data-philosophy]',
        color: '#141713',
        type: 'reveal',
        depth: 110
    },
    {
        target: '[data-manifesto]',
        color: '#141713',
        type: 'atmosphere',
        depth: 80
    },
    {
        target: '[data-services]',
        color: '#141713',
        type: 'reveal',
        depth: 90
    },
    {
        target: '[data-performance]',
        color: '#141713',
        type: 'depth',
        depth: 130
    },
    {
        target: '[data-chef-note]',
        color: '#1d2b21',
        type: 'atmosphere',
        depth: 100
    },
    {
        target: '[data-app-story]',
        color: '#1d2b21',
        type: 'atmosphere',
        depth: 140
    },
    {
        target: '[data-nutrition-ai]',
        color: '#f4f0e6',
        type: 'reveal',
        depth: 150
    },
    {
        target: '[data-journal]',
        color: '#0d0d0d',
        type: 'reveal',
        depth: 110
    },
    {
        target: '[data-library]',
        color: '#f4f0e6',
        type: 'depth',
        depth: 120
    },
    {
        target: '[data-contact]',
        color: '#1d2b21',
        type: 'atmosphere',
        depth: 90
    },
    {
        target: '[data-footer][data-footer-home="true"]',
        color: '#141713',
        type: 'reveal',
        depth: 140
    }
]

function initMobileTransitions() {
    const layers = []

    transitions.forEach(config => {
        const section = document.querySelector(config.target)

        if (!section) return

        const layer = document.createElement('div')

        layer.className = `cinematic-seam cinematic-seam--${config.type}`
        layer.setAttribute('aria-hidden', 'true')

        layer.style.setProperty('--seam-color', config.color)
        layer.style.setProperty('--seam-depth', `${config.depth}px`)

        section.appendChild(layer)
        section.classList.add('has-cinematic-seam')

        layers.push({ section, layer })

        gsap.fromTo(layer, {
            scaleY: 1,
            opacity: 1
        }, {
            scaleY: config.type === 'reveal' ? .2 : .6,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top 95%',
                end: 'top 35%',
                scrub: .45,
                invalidateOnRefresh: true
            }
        })
    })

    return () => {
        layers.forEach(({ section, layer }) => {
            layer.remove()
            section.classList.remove('has-cinematic-seam')
        })
    }
}

function initDesktopTransitions() {
    const sections = document.querySelectorAll(
        '[data-section-transition]'
    )

    sections.forEach(section => {
        const source = document.querySelector(
            section.dataset.sectionTransition
        )

        if (!source) return

        if (
            source.matches('[data-services]') ||
            source.matches('[data-app-story]') ||
            source.matches('[data-nutrition-ai]')
        ) {
            return
        }

        gsap.to(source, {
            y: () => Math.min(window.innerHeight * .22, 220),
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
                invalidateOnRefresh: true
            }
        })
    })
}

export function initSectionTransitions() {
    const mm = gsap.matchMedia()

    mm.add('(max-width: 767px)', () => {
        const profile = getMotionProfile()

        if (!profile.effects.transitions) return

        return initMobileTransitions()
    })

    mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        initDesktopTransitions
    )

}
