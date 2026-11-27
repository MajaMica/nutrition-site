export function createCanvasLifecycle(
    element,
    { wake, sleep }
) {
    let near = true
    let active = null
    let destroyed = false

    const sync = () => {
        if (destroyed) return

        const next = near && !document.hidden

        if (next === active) return

        active = next

        if (active) {
            wake()
        } else {
            sleep()
        }
    }

    const observer = 'IntersectionObserver' in window
        ? new IntersectionObserver(entries => {
            near = entries.some(entry => entry.isIntersecting)
            sync()
        }, {
            rootMargin: '100% 0px',
            threshold: 0
        })
        : null

    observer?.observe(element)

    document.addEventListener('visibilitychange', sync)

    sync()

    return {
        destroy() {
            destroyed = true
            observer?.disconnect()
            document.removeEventListener('visibilitychange', sync)
            sleep()
        }
    }
}
