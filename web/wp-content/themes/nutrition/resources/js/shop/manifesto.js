import gsap from 'gsap'

export function initManifesto() {
    const section = document.querySelector('[data-ed-manifesto]')

    if (!section) return

    const lines = section.querySelectorAll('.ed-manifesto-copy h2 > *')
    const description = section.querySelector('.ed-manifesto-copy p')
    const orbit = section.querySelector('.ed-manifesto-orbit')
    const watermark = section.querySelector('.ed-manifesto-watermark')

    const mm = gsap.matchMedia()

    mm.add({
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduced: '(prefers-reduced-motion: reduce)',
    }, ({ conditions }) => {
        const { mobile, reduced } = conditions

        if (reduced) return

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                end: 'top 15%',
                scrub: mobile ? .4 : .75,
            },
        })

        timeline.from(lines, {
            y: mobile ? 35 : 90,
            opacity: .15,
            stagger: .18,
            ease: 'power2.out',
        })

        timeline.from(description, {
            y: 20,
            opacity: .2,
        }, '-=.3')

        gsap.fromTo(orbit, {
            scale: .75,
        }, {
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        })

        gsap.to(watermark, {
            xPercent: -15,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        })
    })

    return () => mm.revert()
}