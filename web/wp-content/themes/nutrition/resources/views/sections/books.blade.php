<section id="books" class="culinary-library" data-library>

    <div class="library-stage" data-library-stage>

        <div class="library-ambient" aria-hidden="true">
            <span></span>
            <span></span>
        </div>

        <div class="library-watermark" data-library-watermark aria-hidden="true">
            {{ trans('home.books.watermark') }}
        </div>

        <div class="library-intro" data-library-intro>

            <span class="type-label library-label">
                {{ trans('home.books.eyebrow') }}
            </span>

            <h2 class="library-title">
                <span>{{ trans('home.books.title.0') }}</span>
                <em>{{ trans('home.books.title.1') }}</em>
            </h2>

        </div>

        <div class="library-book-area" data-library-book-area>

            <div class="library-book" data-library-book>

                <div class="library-book-front">
                    <img
                        src="{{ Vite::asset('resources/images/books/forbook.webp') }}"
                        alt="{{ trans('home.books.image_alt') }}"
                        loading="lazy"
                        decoding="async"
                    >
                </div>

                <div class="library-book-pages" aria-hidden="true"></div>

                <div class="library-book-spine" aria-hidden="true"></div>

                <div class="library-book-back" aria-hidden="true"></div>

            </div>

            <div class="library-book-shadow" aria-hidden="true"></div>

        </div>

        <div class="library-details" data-library-details>

            <span class="type-label library-label">
                01 — {{ trans('home.books.chapter') }}
            </span>

            <h3 class="library-heading">
                {{ trans('home.books.heading.0') }}
                <em>{{ trans('home.books.heading.1') }}</em>
            </h3>

            <p class="type-body">
                {{ trans('home.books.description') }}
            </p>

            <span class="library-status type-label">
                {{ trans('home.books.coming_soon') }}
            </span>

        </div>

        <div class="library-navigation" aria-hidden="true">
            <span>01</span>

            <div class="library-progress">
                <span data-library-progress></span>
            </div>

            <span>03</span>
        </div>

    </div>

</section>