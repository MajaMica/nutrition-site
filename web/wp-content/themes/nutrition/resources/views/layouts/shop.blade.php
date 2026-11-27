<!doctype html>
<html @php(language_attributes())>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php(do_action('get_header', 'shop'))
        @php(wp_head())

        @vite(['resources/css/shop.css', 'resources/js/shop.js'])
    </head>

    <body @php(body_class('editions-site'))>
        @php(wp_body_open())

        <div id="editions" class="editions">

            <a class="editions-skip" href="#main">
                {{ __('Skip to content', 'sage') }}
            </a>

            @include('woocommerce.partials.header')

            <main id="main" class="editions-main">
                @yield('content')
            </main>

            @include('woocommerce.partials.footer')

        </div>

        @php(do_action('get_footer', 'shop'))
        @php(wp_footer())
    </body>
</html>
