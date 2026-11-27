@php
    $homeUrl = function_exists('pll_home_url')
        ? pll_home_url()
        : home_url('/');

    $chapters = [
        'about' => 'about',
        'services' => 'services',
        'performance' => 'performance',
        'nutrition' => 'app',
        'journal' => 'recipes',
        'books' => 'books',
        'contact' => 'contact',
    ];

    $socials = [
        'Instagram' => 'https://www.instagram.com/wellness_chef_nemanja/',
        'LinkedIn' => 'https://www.linkedin.com/in/nemanja-ljubisavljevic-3a9405293/',
        'WhatsApp' => 'https://wa.me/971553790163',
    ];

    $privacyUrl = get_privacy_policy_url();
@endphp

<footer
    class="editorial-footer {{ is_front_page() ? 'editorial-footer-home' : 'editorial-footer-compact' }}"
    data-footer
    data-footer-home="{{ is_front_page() ? 'true' : 'false' }}"
>

    <div class="footer-stage" data-footer-stage>

        <div class="footer-viewport" data-footer-viewport>

            <div class="footer-track" data-footer-track>

                <div class="footer-landscape" aria-hidden="true">

                    <span class="footer-blob footer-blob-one"></span>
                    <span class="footer-blob footer-blob-two"></span>
                    <span class="footer-blob footer-blob-three"></span>

                    <svg
                        class="footer-landscape-line"
                        viewBox="0 0 2400 900"
                        preserveAspectRatio="none"
                        fill="none"
                    >
                        <path
                            data-footer-line
                            d="M-100 740C260 740 330 170 680 170S1080 760 1430 760S1840 180 2500 180"
                            stroke="currentColor"
                            stroke-width="1"
                            vector-effect="non-scaling-stroke"
                        />
                    </svg>

                </div>

                <section class="footer-panel footer-philosophy">

                    <div class="footer-panel-top">

                        <span class="footer-small">
                            {{ trans('common.brand.name') }}
                            /
                            {{ trans('common.brand.location') }}
                        </span>

                        <span class="footer-small">01 / 03</span>

                    </div>

                    <div class="footer-philosophy-content" data-footer-parallax>

                        <span class="footer-small footer-eyebrow">
                            {{ trans('common.footer.eyebrow') }}
                        </span>

                        <h2 class="footer-headline">

                            <span>
                                {{ trans('common.footer.headline_first') }}
                            </span>

                            <em>
                                {{ trans('common.footer.headline_second') }}
                            </em>

                        </h2>

                    </div>

                    <div class="footer-panel-bottom">

                        <span class="footer-small">
                            {{ trans('common.footer.chapter') }}
                        </span>

                        <div class="footer-scroll-hint">

                            <span class="footer-small">
                                {{ trans('common.footer.scroll') }}
                            </span>

                            <span class="footer-circle footer-circle-small">
                                <svg viewBox="0 0 32 32" fill="none">
                                    <path
                                        d="M5 16H27M18 7L27 16L18 25"
                                        stroke="currentColor"
                                        stroke-width="1.3"
                                    />
                                </svg>
                            </span>

                        </div>

                    </div>

                </section>

                <section class="footer-panel footer-explore">

                    <div class="footer-panel-top">

                        <span class="footer-small">
                            {{ trans('common.footer.explore') }}
                        </span>

                        <span class="footer-small">02 / 03</span>

                    </div>

                    <nav
                        class="footer-chapters"
                        aria-label="{{ trans('common.footer.explore') }}"
                    >

                        @foreach ($chapters as $anchor => $label)

                            <a
                                href="{{ $homeUrl }}#{{ $anchor }}"
                                data-footer-chapter="{{ $anchor }}"
                            >

                                <span class="footer-chapter-number">
                                    {{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}
                                </span>

                                <span class="footer-chapter-name">
                                    {{ trans('common.navigation.' . $label) }}
                                </span>

                                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path
                                        d="M5 19L19 5M5 5H19V19"
                                        stroke="currentColor"
                                        stroke-width="1.2"
                                    />
                                </svg>

                            </a>

                        @endforeach

                    </nav>

                    <div class="footer-panel-bottom">

                        <span class="footer-small">
                            {{ trans('common.footer.signature') }}
                        </span>

                    </div>

                </section>

                <section class="footer-panel footer-signature">

                    <div class="footer-panel-top">

                        <span class="footer-small">
                            {{ trans('common.footer.signature') }}
                        </span>

                        <span class="footer-small">03 / 03</span>

                    </div>

                    <div class="footer-signature-content">

                        <div class="footer-signature-top">

                            <span class="footer-small">
                                {{ trans('common.brand.location') }}
                            </span>

                            <button
                                type="button"
                                class="footer-back-top"
                                data-back-top
                            >

                                <span class="footer-circle footer-top-circle">

                                    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                                        <path
                                            d="M16 27V5M5 16L16 5L27 16"
                                            stroke="currentColor"
                                            stroke-width="1.3"
                                        />
                                    </svg>

                                </span>

                                <span class="footer-small">
                                    {{ trans('common.footer.back_to_top') }}
                                </span>

                            </button>

                        </div>

                        <a
                            class="footer-wordmark"
                            href="{{ $homeUrl }}"
                            data-footer-parallax
                        >
                            Nemanja<em>.</em>
                        </a>

                        <p class="footer-profession">
                            {{ trans('common.footer.profession') }}
                        </p>

                        <div class="footer-socials">

                            @foreach ($socials as $name => $url)

                                <a
                                    href="{{ $url }}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {{ $name }}

                                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path
                                            d="M5 19L19 5M5 5H19V19"
                                            stroke="currentColor"
                                            stroke-width="1.2"
                                        />
                                    </svg>

                                </a>

                            @endforeach

                        </div>

                    </div>

                    <div class="footer-panel-bottom footer-credits">

                        <div class="footer-copyright">

                            <span>
                                © {{ wp_date('Y') }} Nemanja.
                            </span>

                            <span>
                                {{ trans('common.footer.rights') }}
                            </span>

                        </div>

                        @if ($privacyUrl)

                            <a href="{{ $privacyUrl }}">
                                {{ trans('common.footer.privacy') }}
                            </a>

                        @endif

                        <a
                            class="footer-developer"
                            href="https://zencodelab.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>Site &amp; app develop</span>
                            <strong>ZenCodeLab ↗</strong>
                        </a>

                    </div>

                </section>

            </div>

        </div>

        <div class="footer-progress" aria-hidden="true">
            <span data-footer-progress></span>
        </div>

    </div>

</footer>