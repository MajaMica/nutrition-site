@php
    $book = \App\editions_featured_book();
@endphp

<section class="ed-hero" data-ed-hero>

    <div class="ed-hero-stage editions-container" data-ed-hero-stage>

        <div class="ed-hero-ambient" aria-hidden="true">
            <span></span>
            <span></span>
        </div>

        <div class="ed-hero-watermark" aria-hidden="true">
            Editions
        </div>

        <div class="ed-hero-copy" data-ed-hero-copy>

            <div class="ed-hero-eyebrow editions-label">
                <span>01</span>
                <span>{{ trans('shop.hero.eyebrow') }}</span>
            </div>

            <h1 class="ed-hero-title">
                <span>
                    {{ trans('shop.hero.title.0') }}
                </span>

                <em>
                    {{ trans('shop.hero.title.1') }}
                </em>
            </h1>

            <p class="ed-hero-description">
                {{ trans('shop.hero.description') }}
            </p>

            <a class="ed-hero-action" href="#collection">
                {{ trans('shop.hero.action') }}

                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 5L19 19M5 19H19V5"/>
                </svg>
            </a>

        </div>

        @if ($book && $book->get_image_id())

            <div class="ed-hero-visual" data-ed-hero-visual>

                <div class="ed-hero-orbit" aria-hidden="true"></div>

                <div class="ed-hero-book" data-ed-hero-book>

                    @include('woocommerce.partials.book', [
                        'book' => $book,
                        'loading' => 'eager',
                    ])

                </div>

                <div class="ed-hero-shadow" aria-hidden="true"></div>

                <a
                    class="ed-hero-book-caption"
                    href="{{ $book->get_permalink() }}"
                >
                    <span class="editions-label">
                        {{ trans('shop.hero.edition') }}
                    </span>

                    <span>{{ $book->get_name() }} ↗</span>
                </a>

            </div>

        @endif

        <div class="ed-hero-bottom">

            <span class="editions-label">
                {{ trans('shop.hero.scroll') }}
            </span>

            <div class="ed-hero-progress" aria-hidden="true">
                <span data-ed-hero-progress></span>
            </div>

            <span class="editions-label">01 / 05</span>

        </div>

    </div>

</section>