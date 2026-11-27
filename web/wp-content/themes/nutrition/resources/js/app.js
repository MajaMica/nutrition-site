import 'lenis/dist/lenis.css'

import { initAnimationEngine } from './core/animation-engine'
import { initOrganicBackgrounds } from './core/organic-background'
import { initSectionTransitions } from './core/section-transition'
import { initNavigation } from './core/navigation'
import { initFooter } from './core/footer'

import {
    initHome,
    initPhilosophy,
    initManifesto,
    initServices,
    initPerformance,
    initChefNote,
    initNutritionApp,
    initNutritionAI,
    initJournal,
    initLibrary,
    initContact
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
    initPerformance()
    initChefNote()
    initNutritionApp()
    initNutritionAI()
    initJournal()
    initLibrary()
    initContact()
    initOrganicBackgrounds()
    initSectionTransitions()
    initFooter()
    initNavigation()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {
        once: true
    })
} else {
    init()
}