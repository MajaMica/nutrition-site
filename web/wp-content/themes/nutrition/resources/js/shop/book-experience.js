import gsap from 'gsap';

export function initBookExperience() {
    const section = document.querySelector('[data-ed-experience]');

    if (!section) return;

    const chapter = section.closest('[data-ed-cinematic-chapter]');
    const manifesto = chapter?.querySelector('[data-ed-manifesto]');

    const stage = section.querySelector('[data-ed-experience-stage]');
    const intro = section.querySelector('[data-ed-experience-intro]');
    const visual = section.querySelector('[data-ed-experience-visual]');
    const book = section.querySelector('[data-ed-experience-book]');
    const details = section.querySelector('[data-ed-experience-details]');
    const shadow = section.querySelector('[data-ed-experience-shadow]');
    const orbit = section.querySelector('[data-ed-experience-orbit]');
    const light = section.querySelector('[data-ed-experience-light]');
    const watermark = section.querySelector('[data-ed-experience-watermark]');

    const mm = gsap.matchMedia();

    mm.add({
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduced: '(prefers-reduced-motion: reduce)',
        short: '(max-height: 599px)',
    }, ({ conditions }) => {
        const { mobile, reduced, short } = conditions;

        if (reduced || short) return;

        section.classList.add('is-cinematic');

        if (manifesto) {
            chapter.classList.add('is-cinematic');
        }

        gsap.set(details, {
            autoAlpha: 0,
            y: 35,
        });

        gsap.set(book, {
            rotationY: -35,
            rotationX: 8,
            rotationZ: -12,
            scale: .8,
        });

        const timeline = gsap.timeline({
            defaults: {
                ease: 'none',
            },
            scrollTrigger: {
                trigger: chapter || stage,
                start: 'top top',
                end: mobile ? '+=260%' : '+=340%',
                pin: true,
                scrub: mobile ? .5 : .9,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        timeline
            .to(book, {
                rotationY: 18,
                rotationX: 0,
                rotationZ: -4,
                scale: mobile ? 1.08 : 1.18,
                duration: 1.2,
            }, 0)

            .to(orbit, {
                scale: 1.2,
                rotation: 20,
                duration: 1.2,
            }, 0)

            .to(light, {
                xPercent: -8,
                scale: 1.12,
                duration: 2.5,
            }, 0)

            .to(intro, {
                autoAlpha: 0,
                y: -50,
                duration: .65,
            }, .65)

            .to(visual, {
                x: () => mobile ? 0 : -stage.clientWidth * .39,
                y: () => mobile ? -stage.clientHeight * .16 : 0,
                duration: 1.15,
            }, 1.2)

            .to(book, {
                rotationY: -12,
                rotationZ: 3,
                scale: mobile ? .78 : 1.05,
                duration: 1.15,
            }, 1.2)

            .to(shadow, {
                scaleX: .75,
                opacity: .45,
                duration: 1.15,
            }, 1.2)

            .to(watermark, {
                xPercent: -12,
                duration: 2.5,
            }, 0)

            .to(details, {
                autoAlpha: 1,
                y: 0,
                duration: .65,
            }, 1.95)

            .to({}, {
                duration: .45,
            });

        if (manifesto) {
            timeline.shiftChildren(1.6, true, 0);

            timeline
                .fromTo(manifesto, {
                    autoAlpha: 1,
                    scale: 1,
                }, {
                    autoAlpha: 0,
                    scale: 1.06,
                    duration: .85,
                    ease: 'power2.inOut',
                }, .65)

                .fromTo(intro, {
                    autoAlpha: 0,
                    y: 45,
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: .85,
                    ease: 'power2.out',
                }, .75)

                .fromTo(visual, {
                    autoAlpha: 0,
                    x: mobile ? 0 : 140,
                    y: mobile ? 70 : 0,
                }, {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                }, .6);
        }

        return () => {
            section.classList.remove('is-cinematic');
            chapter?.classList.remove('is-cinematic');
        };
    });
}
