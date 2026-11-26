import 'lenis/dist/lenis.css'

import { initAnimationEngine } from './core/animation-engine'

import {
    initHome,
    initPhilosophy,
    initManifesto,
    initServices,
    initNutritionApp,
    initJournal
} from './home'

async function init() {
    initAnimationEngine()

    try {
        await initHome()
    } catch (error) {
        console.error('Home initialization failed:', error)
    }

    initPhilosophy()
    initManifesto()
    initServices()
    initNutritionApp()
    initJournal()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {
        once: true
    })
} else {
    init()
}