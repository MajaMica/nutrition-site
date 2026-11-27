import {
    gsap,
    ScrollTrigger,
    initAnimationEngine
} from './animation-engine'

let overlay = null
let running = false

function createOverlay() {
    const element = document.createElement('div')

    element.className = 'chapter-transition'
    element.setAttribute('aria-hidden', 'true')

    element.innerHTML = `
        <div class="chapter-transition-layer chapter-transition-olive"></div>

        <div class="chapter-transition-layer chapter-transition-main">

            <div class="chapter-transition-content">

                <span class="chapter-transition-number"></span>

                <span class="chapter-transition-title"></span>

            </div>

            <span class="chapter-transition-brand">
                Nemanja / UAE
            </span>

        </div>
    `

    document.body.appendChild(element)

    return element
}

export function isChapterTransitionRunning() {
    return running
}

export function playChapterTransition({
    number,
    title,
    navigate
}) {
    if (running) return

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    )

    if (reducedMotion.matches) {
        navigate()
        return
    }

    if (!overlay) {
        overlay = createOverlay()
    }

    const olive = overlay.querySelector(
        '.chapter-transition-olive'
    )

    const main = overlay.querySelector(
        '.chapter-transition-main'
    )

    const content = overlay.querySelector(
        '.chapter-transition-content'
    )

    overlay.querySelector(
        '.chapter-transition-number'
    ).textContent = number

    overlay.querySelector(
        '.chapter-transition-title'
    ).textContent = title

    const { lenis } = initAnimationEngine()

    const lenisWasStopped = lenis?.isStopped

    running = true

    overlay.classList.add('is-active')

    lenis?.stop()

    gsap.set([olive, main], {
        xPercent: -101,
        x: 0
    })

    gsap.set(content, {
        x: -40
    })

    function finish() {
        running = false

        overlay.classList.remove('is-active')

        gsap.set([olive, main], {
            xPercent: -101
        })

        if (!lenisWasStopped) {
            lenis?.start()
        }
    }

    const timeline = gsap.timeline({
        onComplete: finish,
        onInterrupt: finish
    })

    timeline
        .to(olive, {
            xPercent: 0,
            duration: .38,
            ease: 'power3.inOut'
        }, 0)

        .to(main, {
            xPercent: 0,
            duration: .44,
            ease: 'power3.inOut'
        }, .08)

        .to(content, {
            x: 0,
            duration: .44,
            ease: 'power2.out'
        }, .08)

        .call(() => {
            try {
                navigate()

                ScrollTrigger.update()

                ScrollTrigger.getAll().forEach(trigger => {
                    const tween = trigger.getTween()

                    if (typeof tween?.progress === 'function') {
                        tween.progress(1)
                    }
                })
            } catch (error) {
                console.error(
                    'Chapter transition failed:',
                    error
                )

                timeline.kill()
            }
        }, [], .54)

        .to(main, {
            xPercent: 101,
            duration: .44,
            ease: 'power3.inOut'
        }, .68)

        .to(olive, {
            xPercent: 101,
            duration: .42,
            ease: 'power3.inOut'
        }, .78)
}