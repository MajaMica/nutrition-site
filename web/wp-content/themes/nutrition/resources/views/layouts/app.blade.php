<!doctype html>
<html @php(language_attributes())>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @if(is_front_page())
            <link
                rel="preload"
                as="image"
                media="(min-width: 768px)"
                href="{{ get_theme_file_uri('public/storytelling/sequences/scene-001/frame_000000.webp') }}"
                fetchpriority="high"
            >
            <link
                rel="preload"
                as="image"
                media="(max-width: 767px)"
                href="{{ get_theme_file_uri('public/storytelling/mobile/sequences/scene-001/frame_000000.webp') }}"
                fetchpriority="high"
            >
        @endif

        @php(do_action('get_header'))
        @php(wp_head())

        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>

    <body @php(body_class())>
        @php(wp_body_open())

        <div id="app" class="site">
            <a class="sr-only focus:not-sr-only" href="#main">
                {{ __('Skip to content', 'sage') }}
            </a>

            @include('sections.header')

            <main id="main" class="site-main">
                @yield('content')
            </main>

            @unless(is_front_page())
                @hasSection('sidebar')
                    <aside class="sidebar">
                        @yield('sidebar')
                    </aside>
                @endif
            @endunless

            @include('sections.footer')
        </div>

        @php(do_action('get_footer'))
        @php(wp_footer())
    </body>
</html>