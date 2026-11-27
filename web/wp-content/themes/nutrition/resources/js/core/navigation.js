import {
    gsap,
    ScrollTrigger,
    initAnimationEngine
} from './animation-engine'

export function initNavigation() {
    const header = document.querySelector('[data-header]')

    if (!header) return

    const navigation = header.querySelector('[data-navigation]')
    const toggle = header.querySelector('[data-menu-toggle]')
    const indicator = header.querySelector('[data-nav-indicator]')
    const progress = header.querySelector('[data-scroll-progress]')
    const language = header.querySelector('[data-language-switcher]')

    const links = Array.from(
        header.querySelectorAll('[data-nav-link]')
    )

    const { lenis } = initAnimationEngine()

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    )

    const chapters = links.map(link => ({
        link,
        id: link.dataset.navLink,
        section: document.getElementById(link.dataset.navLink),
        start: 0
    })).filter(chapter => chapter.section)

    let active = null

    function setMenu(open) {
        header.classList.toggle('is-menu-open', open)

        if (!toggle) return

        toggle.setAttribute('aria-expanded', String(open))

        toggle.setAttribute(
            'aria-label',
            open
                ? toggle.dataset.closeLabel
                : toggle.dataset.openLabel
        )
    }

    function moveIndicator() {
        if (!active || !indicator || !navigation) return

        const linkRect = active.link.getBoundingClientRect()
        const navRect = navigation.getBoundingClientRect()

        if (!linkRect.width) return

        indicator.style.width = `${linkRect.width}px`
        indicator.style.transform = `translateX(${linkRect.left - navRect.left}px)`
        indicator.style.opacity = '1'
    }

    function setActive(chapter) {
        if (!chapter || active === chapter) return

        active = chapter

        links.forEach(link => {
            const selected = link === chapter.link

            link.classList.toggle('is-active', selected)

            if (selected) {
                link.setAttribute('aria-current', 'location')
            } else {
                link.removeAttribute('aria-current')
            }
        })

        moveIndicator()
    }

    function measure() {
        const triggers = ScrollTrigger.getAll()

        chapters.forEach(chapter => {
            const pinned = triggers.find(trigger =>
                trigger.trigger === chapter.section && trigger.pin
            )

            chapter.start = pinned
                ? pinned.start
                : chapter.section.getBoundingClientRect().top
                    + window.scrollY
        })

        chapters.sort((a, b) => a.start - b.start)

        update()
        moveIndicator()
    }

    function update() {
        const scroll = window.scrollY
        const max = ScrollTrigger.maxScroll(window)
        const offset = window.innerHeight * .3

        header.classList.toggle('is-scrolled', scroll > 40)

        if (progress) {
            const value = max > 0
                ? gsap.utils.clamp(0, 1, scroll / max)
                : 0

            progress.style.transform = `scaleX(${value})`
        }

        let current = chapters[0]

        for (const chapter of chapters) {
            if (scroll + offset >= chapter.start) {
                current = chapter
            }
        }

        setActive(current)
    }

    function goTo(chapter, immediate = false) {
        const triggers = ScrollTrigger.getAll()

        const pinned = triggers.find(trigger =>
            trigger.trigger === chapter.section && trigger.pin
        )

        const headerOffset = header.getBoundingClientRect().bottom

        const destination = gsap.utils.clamp(
            0,
            ScrollTrigger.maxScroll(window),
            pinned
                ? chapter.start + 2
                : chapter.start - headerOffset
        )

        const distance = Math.abs(
            destination - window.scrollY
        )

        const jump = immediate
            || reducedMotion.matches
            || distance > window.innerHeight * 3

        if (lenis) {
            lenis.scrollTo(destination, {
                immediate: jump,
                duration: .9,
                force: true
            })
        } else {
            window.scrollTo({
                top: destination,
                behavior: jump ? 'instant' : 'smooth'
            })
        }
    }

    chapters.forEach(chapter => {
        chapter.link.addEventListener('click', event => {
            if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) return

            event.preventDefault()

            setMenu(false)

            if (language) language.open = false

            history.pushState(null, '', `#${chapter.id}`)

            goTo(chapter)
        })
    })

    toggle?.addEventListener('click', () => {
        const open = !header.classList.contains('is-menu-open')

        setMenu(open)

        if (language) language.open = false
    })

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return

        if (header.classList.contains('is-menu-open')) {
            setMenu(false)
            toggle?.focus()
        }

        if (language?.open) {
            language.open = false
            language.querySelector('summary')?.focus()
        }
    })

    document.addEventListener('click', event => {
        if (!header.contains(event.target)) {
            setMenu(false)

            if (language) language.open = false
        }
    })

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1280) {
            setMenu(false)
        }

        moveIndicator()
    })

    window.addEventListener('popstate', () => {
        const id = window.location.hash.slice(1) || 'home'
        const chapter = chapters.find(item => item.id === id)

        if (chapter) goTo(chapter, true)
    })

    window.addEventListener('scroll', update, {
        passive: true
    })

    ScrollTrigger.addEventListener('refresh', measure)

    ScrollTrigger.refresh()

    measure()

    const initialChapter = chapters.find(
        chapter => `#${chapter.id}` === window.location.hash
    )

    if (initialChapter) {
        goTo(initialChapter, true)
    }
}