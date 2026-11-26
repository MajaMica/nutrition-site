import { gsap, ScrollTrigger } from '../core/animation-engine'

export function initServices() {
    const section = document.querySelector('[data-services]')

    if (!section) return

    const stage = section.querySelector('[data-services-stage]')
    const video = section.querySelector('[data-services-video]')
    const chapters = gsap.utils.toArray(
        section.querySelectorAll('[data-services-chapter]')
    )

    if (!stage || !video || !chapters.length) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
        video.pause()

        gsap.set(chapters, {
            autoAlpha: 0,
            y: 30
        })

        gsap.set(chapters[0], {
            autoAlpha: 1,
            y: 0
        })

        const playhead = {
            progress: 0
        }

        const renderVideo = () => {
            if (!Number.isFinite(video.duration)) return

            const time = playhead.progress *
                Math.max(0, video.duration - 0.05)

            if (Math.abs(video.currentTime - time) > 0.025) {
                video.currentTime = time
            }
        }

        video.addEventListener('loadedmetadata', renderVideo)

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=350%',
                pin: stage,
                scrub: 1.5,
                invalidateOnRefresh: true
            }
        })

        timeline.to(playhead, {
            progress: 1,
            duration: 3,
            ease: 'none',
            onUpdate: renderVideo
        }, 0)

        chapters.forEach((chapter, index) => {
            if (index > 0) {
                timeline.to(chapter, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                }, index + 0.05)
            }

            if (index < chapters.length - 1) {
                timeline.to(chapter, {
                    autoAlpha: 0,
                    y: -30,
                    duration: 0.3,
                    ease: 'power2.in'
                }, index + 0.7)
            }
        })

        return () => {
            video.pause()
            video.removeEventListener(
                'loadedmetadata',
                renderVideo
            )
        }
    })

    ScrollTrigger.refresh()
}
