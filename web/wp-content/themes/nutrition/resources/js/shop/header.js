export function initHeader() {
    const header = document.querySelector('[data-ed-header]')
    const progress = header?.querySelector('[data-ed-progress]')
    const language = header?.querySelector('.ed-language')

    if (!header || !progress) return

    let scheduled = false
    let compact = false

    const update = () => {
        const scroll = window.scrollY

        if (scroll > 160) compact = true
        if (scroll < 40) compact = false

        header.classList.toggle('is-compact', compact)

        const maxScroll = document.documentElement.scrollHeight
            - window.innerHeight

        const value = maxScroll > 0
            ? Math.min(1, Math.max(0, scroll / maxScroll))
            : 0

        progress.style.transform = `scaleX(${value})`

        scheduled = false
    }

    const schedule = () => {
        if (scheduled) return

        scheduled = true
        requestAnimationFrame(update)
    }

    document.addEventListener('click', event => {
        if (language && !language.contains(event.target)) {
            language.open = false
        }
    })

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && language?.open) {
            language.open = false
            language.querySelector('summary')?.focus()
        }
    })

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    update()
}