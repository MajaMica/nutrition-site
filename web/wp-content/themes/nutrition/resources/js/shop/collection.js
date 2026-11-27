import gsap from 'gsap';

export function initCollection() {
    const section = document.querySelector('[data-ed-collection]');

    if (!section) return;

    const title = section.querySelector('[data-ed-collection-title]');
    const items = section.querySelectorAll('[data-ed-collection-item]');

    const mm = gsap.matchMedia();

    mm.add({
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduced: '(prefers-reduced-motion: reduce)',
    }, ({ conditions }) => {
        const { mobile, reduced } = conditions;

        if (reduced) return;

        gsap.from(title.children, {
            y: mobile ? 24 : 65,
            opacity: .2,
            stagger: .15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 95%',
                end: 'top 45%',
                scrub: mobile ? .4 : .7,
            },
        });

        items.forEach(item => {
            const book = item.querySelector('[data-ed-collection-book]');
            const copy = item.querySelector('[data-ed-collection-copy]');
            const object = book?.querySelector('.ed-book-object');

            if (object) {
                gsap.fromTo(object, {
                    rotationY: -35,
                    rotationZ: -12,
                    y: mobile ? 18 : 40,
                }, {
                    rotationY: 5,
                    rotationZ: -3,
                    y: mobile ? -8 : -25,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: mobile ? .45 : .8,
                    },
                });
            }

            gsap.from(copy.children, {
                y: mobile ? 18 : 35,
                opacity: .2,
                stagger: .1,
                duration: .8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: copy,
                    start: 'top 92%',
                    once: true,
                },
            });
        });
    });
}
