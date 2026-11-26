<header class="site-header" data-header>
    <div class="site-header-inner">

        <a class="site-brand" href="{{ home_url('/') }}" aria-label="{{ $siteName }}">
            <span class="site-brand-name">Nemanja</span>
            <span class="site-brand-label">Private Chef</span>
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

            <a class="site-header-contact" href="{{ home_url('/contact/') }}">
                <span>Get in touch</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 19L19 5M5 5H19V19"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </a>

            @if (has_nav_menu('primary_navigation'))
                <button
                    class="site-menu-toggle"
                    type="button"
                    aria-label="Open menu"
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