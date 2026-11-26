import { gsap, ScrollTrigger } from '../core/animation-engine'
import { FrameSequence } from '../engines/frame-sequence'

export async function initHome() {
    const hero = document.querySelector('[data-hero]')

    if (!hero) return

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
const scenes = manifest.scenes
const titles = JSON.parse(hero.dataset.heroTitles || '[]')

title.textContent = titles[0] ?? scenes[0].title

    if (reducedMotion) {
        indicator.hidden = true
        return
    }

    const totalWeight = scenes.reduce(
        (sum, scene) => sum + (scene.scrollWeight ?? 1),
        0
    )

    let cursor = 0

    const timeline = scenes.map((scene) => {
        const start = cursor
        const weight =
            (scene.scrollWeight ?? 1) / totalWeight

        cursor += weight

        return {
            ...scene,
            scrollStart: start,
            scrollEnd: cursor,
            scrollDuration: weight
        }
    })

    const playhead = { progress: 0 }

    let activeScene = -1

    function mapProgress(progress, curve) {
        if (!curve || curve.length < 2) {
            return progress
        }

        for (let i = 1; i < curve.length; i++) {
            const [x1, y1] = curve[i - 1]
            const [x2, y2] = curve[i]

            if (progress <= x2) {
                const ratio =
                    (progress - x1) / (x2 - x1)

                return gsap.utils.interpolate(
                    y1,
                    y2,
                    ratio
                )
            }
        }

        return curve[curve.length - 1][1]
    }

    function updateSequence() {
        const progress = gsap.utils.clamp(
            0, 1, playhead.progress
        )

        let sceneIndex = timeline.findIndex(
            (scene) => progress < scene.scrollEnd
        )

        if (sceneIndex === -1) {
            sceneIndex = timeline.length - 1
        }

        const scene = timeline[sceneIndex]

        const localProgress = gsap.utils.clamp(
            0,
            1,
            (progress - scene.scrollStart) /
                scene.scrollDuration
        )

        const frameProgress = gsap.utils.clamp(
            0,
            1,
            mapProgress(
                localProgress,
                scene.speedCurve
            )
        )

        const frame = scene.startFrame + Math.round(
            frameProgress * (scene.frameCount - 1)
        )

        sequence.render(frame)

        if (sceneIndex !== activeScene) {
            const initial = activeScene === -1

            activeScene = sceneIndex

            gsap.killTweensOf(title)

            title.textContent = titles[sceneIndex] ?? scene.title;

            if (!initial) {
                gsap.fromTo(
                    title,
                    {
                        opacity: 0,
                        y: 24
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    }
                )
            }
        }
    }

    updateSequence()

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
                    )
                })
            }
        }
    })

    ScrollTrigger.refresh()
}
