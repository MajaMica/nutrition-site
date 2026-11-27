
import { gsap, ScrollTrigger } from '../core/animation-engine'
import { getMotionProfile } from '../core/motion-profile'

function initMobileManifesto(section) {
    const intro = section.querySelector('.manifesto-intro')
    const lines = section.querySelectorAll('.manifesto-line > span')
    const label = section.querySelector('.manifesto-label')
    const lead = section.querySelector('.manifesto-lead')
    const details = section.querySelector('.manifesto-details')
    const heading = details.querySelector('h3')
    const paragraphs = details.querySelectorAll('.manifesto-copy p')
    const link = details.querySelector('.manifesto-link')

    section.classList.add('is-mobile-cinematic')

    gsap.set(section, {
        '--manifesto-light': 0,
        '--manifesto-line': 0
    })

    const timeline = gsap.timeline({
        scrollTrigger: {
    trigger: intro,
    start: 'top 90%',
    end: 'top 25%',
    scrub: 0.3,
    invalidateOnRefresh: true
}
    })

    timeline
        .fromTo(label, {
            opacity: 0,
            y: 12
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5
        }, 0)
        .fromTo(lines[0], {
            yPercent: 110,
            scale: 0.92
        }, {
            yPercent: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out'
        }, 0)
        .fromTo(lines[1], {
            yPercent: 110,
            scale: 0.94
        }, {
            yPercent: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out'
        }, 0.65)
        .to(lines[0], {
            opacity: 0.65,
            scale: 0.96,
            duration: 0.7
        }, 0.8)
        .to(section, {
            '--manifesto-light': 1,
            '--manifesto-line': 1,
            duration: 1.4,
            ease: 'sine.inOut'
        }, 0.3)
        .fromTo(lead, {
            opacity: 0,
            y: 24
        }, {
            opacity: 1,
            y: 0,
            duration: 0.7
        }, 1.3)
        .to(lines[0], {
            opacity: 1,
            scale: 1,
            duration: 0.5
        }, 1.8)

    gsap.fromTo(heading, {
        opacity: 0,
        y: 32,
        scale: 0.96
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: heading,
            start: 'top 95%',
            end: 'top 55%',
            scrub: 0.5
        }
    })

    paragraphs.forEach(paragraph => {
        gsap.fromTo(paragraph, {
            opacity: 0,
            y: 24
        }, {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: paragraph,
                start: 'top 95%',
                end: 'top 65%',
                scrub: 0.5
            }
        })
    })

    gsap.fromTo(link, {
        opacity: 0,
        y: 12
    }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: link,
            start: 'top 98%',
            end: 'top 80%',
            scrub: 0.4
        }
    })

    gsap.to(section, {
        '--manifesto-light': 0,
        ease: 'none',
        scrollTrigger: {
            trigger: details,
            start: 'top center',
            end: 'bottom top',
            scrub: 0.6
        }
    })

    return () => {
        section.classList.remove('is-mobile-cinematic')
    }
}

function initDesktopManifesto(section) {
    const lines = section.querySelectorAll('.manifesto-line > span')

    gsap.fromTo(lines, {
        yPercent: 110
    }, {
        yPercent: 0,
        duration: 1.4,
        stagger: 0.18,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: section.querySelector('.manifesto-title'),
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    })

    section.querySelectorAll('[data-reveal]').forEach(element => {
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
}

export function initManifesto() {
    const section = document.querySelector('[data-manifesto]')

    if (!section) return

    const mm = gsap.matchMedia()

    mm.add({
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        tall: '(min-height: 600px)',
        reduced: '(prefers-reduced-motion: reduce)'
    }, context => {
        const { mobile, tall, reduced } = context.conditions
        const profile = getMotionProfile()

        if (mobile) {
            if (profile.reduced || !tall) return

            return initMobileManifesto(section)
        }

        if (!reduced) {
            initDesktopManifesto(section)
        }
    })

    ScrollTrigger.refresh()
}
