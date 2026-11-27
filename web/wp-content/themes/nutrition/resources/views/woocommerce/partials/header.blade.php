@php
    $shopUrl = \App\editions_url();
    $homeUrl = \App\editions_home_url();
    $cartCount = \App\editions_cart_count();

    $languages = function_exists('pll_the_languages')
        ? pll_the_languages([
            'raw' => 1,
            'hide_if_empty' => 0,
            'hide_if_no_translation' => 1,
        ])
        : [];
@endphp

<header class="ed-header" data-ed-header>

    <div class="ed-header-top editions-container">

        <a class="ed-header-back" href="{{ $homeUrl }}">
            <span aria-hidden="true">↖</span>
            <span>{{ trans('shop.navigation.back') }}</span>
        </a>

        @if (!empty($languages))
            <details class="ed-language">
                <summary aria-label="{{ trans('shop.navigation.language') }}">
                    {{ strtoupper(\App\current_language()) }}
                    <span aria-hidden="true">⌄</span>
                </summary>

                <div class="ed-language-options">
                    @foreach ($languages as $language)
                        <a
                            href="{{ $language['url'] }}"
                            lang="{{ $language['slug'] }}"
                            hreflang="{{ $language['slug'] }}"
                        >
                            {{ strtoupper($language['slug']) }}
                        </a>
                    @endforeach
                </div>
            </details>
        @endif

    </div>

    <div class="ed-header-main editions-container">

        <nav class="ed-header-nav" aria-label="{{ trans('shop.navigation.collection') }}">

            <a href="{{ $shopUrl }}#collection">
                <small>01</small>
                {{ trans('shop.navigation.collection') }}
            </a>

            <a href="{{ $shopUrl }}#story">
                <small>02</small>
                {{ trans('shop.navigation.story') }}
            </a>

        </nav>

        <a class="ed-brand" href="{{ $shopUrl }}">
            <span class="ed-brand-name">
                {{ trans('shop.brand.name') }}
            </span>

            <span class="ed-brand-label">
                {{ trans('shop.brand.label') }}
            </span>
        </a>

        <div class="ed-header-actions">

            <a
                class="ed-header-icon"
                href="{{ wc_get_page_permalink('myaccount') }}"
                aria-label="{{ trans('shop.navigation.account') }}"
            >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.5"/>
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2"/>
                </svg>
            </a>

            <a
                class="ed-header-cart"
                href="{{ wc_get_cart_url() }}"
                aria-label="{{ trans('shop.navigation.cart') }}"
            >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 7h16l1 14H3L4 7Z"/>
                    <path d="M8 9V6a4 4 0 0 1 8 0v3"/>
                </svg>

                <span class="ed-cart-count">
                    {{ $cartCount }}
                </span>
            </a>

        </div>

    </div>

    <div class="ed-header-progress" aria-hidden="true">
        <span data-ed-progress></span>
    </div>

</header>