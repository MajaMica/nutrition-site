@php
    $languages = function_exists('pll_the_languages')
        ? pll_the_languages([
            'raw' => 1,
            'hide_if_empty' => 0,
            'hide_if_no_translation' => 1,
        ])
        : [];

    $currentLanguage = function_exists('pll_current_language')
        ? pll_current_language('slug')
        : 'en';

    $homeUrl = function_exists('pll_home_url')
        ? pll_home_url()
        : home_url('/');
@endphp

<header class="site-header" data-header>
    <div class="site-header-inner">

        <a
            class="site-brand"
            href="{{ $homeUrl }}"
            aria-label="{{ $siteName }}"
        >
            <img
                class="site-brand-logo"
                src="{{ Vite::asset('resources/images/brand/logo.webp') }}"
                alt=""
                width="48"
                height="48"
            >

            <span class="site-brand-text">
                <span class="site-brand-name">
                    {{ trans('common.brand.name') }}
                </span>

                <span class="site-brand-label">
                    {{ trans('common.brand.subtitle') }}
                </span>
            </span>
        </a>

        @if (has_nav_menu('primary_navigation'))
            <nav
                id="site-navigation"
                class="site-navigation"
                aria-label="{{ wp_get_nav_menu_name('primary_navigation') }}"
            >
                {!! wp_nav_menu([
                    'theme_location' => 'primary_navigation',
                    'menu_class' => 'site-menu',
                    'container' => false,
                    'fallback_cb' => false,
                    'echo' => false,
                ]) !!}
            </nav>
        @endif

        <div class="site-header-actions">

            @if (!empty($languages))
                <details class="site-language" data-language-switcher>
                    <summary
                        class="site-language-trigger"
                        aria-label="{{ trans('common.accessibility.select_language') }}"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                                stroke="currentColor"
                                stroke-width="1.4"
                            />
                            <ellipse
                                cx="12"
                                cy="12"
                                rx="4"
                                ry="9"
                                stroke="currentColor"
                                stroke-width="1.4"
                            />
                            <path
                                d="M3 12H21"
                                stroke="currentColor"
                                stroke-width="1.4"
                            />
                        </svg>

                        <span>
                            {{ strtoupper($currentLanguage ?: 'en') }}
                        </span>

                        <svg
                            class="site-language-chevron"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M3 4.5L6 7.5L9 4.5"
                                stroke="currentColor"
                                stroke-width="1.4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </summary>

                    <ul class="site-language-dropdown">
                        @foreach ($languages as $language)
                            <li>
                                <a
                                    class="site-language-option {{ $language['current_lang'] ? 'is-active' : '' }}"
                                    href="{{ $language['url'] }}"
                                    lang="{{ $language['slug'] }}"
                                    hreflang="{{ $language['slug'] }}"
                                    @if ($language['current_lang'])
                                        aria-current="true"
                                    @endif
                                >
                                    <span class="site-language-code">
                                        {{ strtoupper($language['slug']) }}
                                    </span>

                                    <span class="site-language-name">
                                        {{ $language['name'] }}
                                    </span>

                                    @if ($language['current_lang'])
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M5 12L10 17L19 7"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    @endif
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </details>
            @endif

            <a
                class="site-header-contact"
                href="{{ home_url('/contact/') }}"
            >
                <span>{{ trans('common.actions.contact') }}</span>

                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M5 19L19 5M5 5H19V19"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </a>

            @if (has_nav_menu('primary_navigation'))
                <button
                    class="site-menu-toggle"
                    type="button"
                    aria-label="{{ trans('common.accessibility.open_menu') }}"
                    aria-expanded="false"
                    aria-controls="site-navigation"
                    data-menu-toggle
                >
                    <span></span>
                    <span></span>
                </button>
            @endif

        </div>

    </div>
</header>