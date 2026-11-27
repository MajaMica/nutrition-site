import { ServicesFrameSequence } from '../engines/services-frame-sequence'

import { gsap, ScrollTrigger } from '../core/animation-engine'
import { getMotionProfile } from '../core/motion-profile'

function initMobileServices(section, stage, video, chapters) {
    const canvas = section.querySelector('[data-services-canvas]')

    if (!canvas) return

    section.classList.add('is-mobile-cinematic')

    video.pause()

    const sequence = new ServicesFrameSequence(
        section,
        stage,
        canvas,
        chapters
    )

    const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=180%',
        pin: stage,
        invalidateOnRefresh: true,
        onUpdate: self => {
            sequence.setProgress(self.progress)
        },
        onRefresh: self => {
            sequence.setProgress(self.progress)
        }
    })

    sequence.setProgress(trigger.progress)

    sequence.init().catch(error => {
        if (sequence.destroyed) return

        console.warn('Services sequence:', error)

        sequence.destroy()
        trigger.kill()

        section.classList.remove('is-mobile-cinematic')

        ScrollTrigger.refresh()
    })

    return () => {
        sequence.destroy()
        trigger.kill()

        section.classList.remove('is-mobile-cinematic')
    }
}

function initDesktopServices(section, stage, video, chapters) {
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
        video.removeEventListener('loadedmetadata', renderVideo)
    }
}

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

            return initMobileServices(
                section,
                stage,
                video,
                chapters
            )
        }

        if (!reduced) {
            return initDesktopServices(
                section,
                stage,
                video,
                chapters
            )
        }
    })

    ScrollTrigger.refresh()
}
