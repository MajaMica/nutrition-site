import 'lenis/dist/lenis.css'

import { initAnimationEngine } from './core/animation-engine'
import { initHome } from './sections/hero'

async function init() {
    initAnimationEngine()

    const storytelling = import('./storytelling')
        .then(module => ({ module }))
        .catch(error => ({ error }))

    try {
        await initHome()
    } catch (error) {
        console.error('Home initialization failed:', error)
    }

    try {
        const result = await storytelling

        if (result.error) throw result.error

        result.module.initStorytelling()

        performance.mark('storytelling:ready')
    } catch (error) {
        console.error('Storytelling initialization failed:', error)
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {
        once: true
    })
} else {
    init()
}
