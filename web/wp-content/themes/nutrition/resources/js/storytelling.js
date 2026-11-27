import { initOrganicBackgrounds } from './core/organic-background'
import { initSectionTransitions } from './core/section-transition'
import { initNavigation } from './core/navigation'
import { initFooter } from './core/footer'

import {
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

export function initStorytelling() {
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
    initFooter()
    initSectionTransitions()
    initNavigation()
}
