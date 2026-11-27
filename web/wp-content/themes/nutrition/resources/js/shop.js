import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initHeader } from './shop/header'
import { initHero } from './shop/hero'
import { initManifesto } from './shop/manifesto'
import { initBookExperience } from './shop/book-experience'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
    initHeader()
    initHero()
    if (!document.querySelector('[data-ed-cinematic-chapter] [data-ed-experience]')) {
        initManifesto()
    }
    initBookExperience()

    document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
    })
}, { once: true })