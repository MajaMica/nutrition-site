@php
    $shopUrl = \App\editions_url();
    $homeUrl = \App\editions_home_url();
    $privacyUrl = get_privacy_policy_url();
@endphp

<footer class="ed-footer" data-ed-footer>

    <div class="ed-footer-inner editions-container">

        <div class="ed-footer-top">

            <span class="editions-label">
                Nemanja Editions — {{ trans('shop.footer.location') }}
            </span>

            <a
                class="ed-footer-top-link"
                href="#editions"
                aria-label="{{ trans('shop.footer.back_to_top') }}"
            >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 19L19 5M5 5H19V19"/>
                </svg>
            </a>

        </div>

        <h2 class="ed-footer-statement">
            {{ trans('shop.footer.statement') }}
        </h2>

        <div class="ed-footer-navigation">

            <div class="ed-footer-column">

                <span class="editions-label">
                    {{ trans('shop.footer.explore') }}
                </span>

                <a href="{{ $shopUrl }}#collection">
                    {{ trans('shop.navigation.collection') }}
                </a>

                <a href="{{ $shopUrl }}#story">
                    {{ trans('shop.navigation.story') }}
                </a>

                <a href="{{ wc_get_page_permalink('myaccount') }}">
                    {{ trans('shop.navigation.account') }}
                </a>

            </div>

            <div class="ed-footer-column">

                <span class="editions-label">
                    {{ trans('shop.footer.connect') }}
                </span>

                <a
                    href="https://www.instagram.com/wellness_chef_nemanja/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Instagram <span aria-hidden="true">↗</span>
                </a>

                <a
                    href="https://www.linkedin.com/in/nemanja-ljubisavljevic-3a9405293/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn <span aria-hidden="true">↗</span>
                </a>

                <a href="{{ $homeUrl }}">
                    {{ trans('shop.footer.back') }}
                    <span aria-hidden="true">↗</span>
                </a>

            </div>

        </div>

        <div class="ed-footer-wordmark" aria-hidden="true">
            Editions.
        </div>

    </div>

    <div class="ed-footer-bottom">

        <div class="ed-footer-bottom-inner editions-container">

            <span>
                © {{ wp_date('Y') }} Nemanja Editions
            </span>

            @if ($privacyUrl)
                <a href="{{ $privacyUrl }}">
                    {{ trans('shop.footer.privacy') }}
                </a>
            @endif

            <a
                href="https://zencodelab.dev/"
                target="_blank"
                rel="noopener noreferrer"
            >
                {{ trans('shop.footer.development') }}
                — ZenCodeLab
            </a>

        </div>

    </div>

</footer>