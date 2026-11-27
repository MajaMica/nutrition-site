@php
    $book = \App\editions_featured_book();
@endphp

@if ($book && $book->get_image_id())
    <section class="ed-experience" data-ed-experience>

        <div class="ed-experience-stage editions-container"
             data-ed-experience-stage>

            <div class="ed-experience-light"
                 data-ed-experience-light
                 aria-hidden="true"></div>

            <div class="ed-experience-orbit"
                 data-ed-experience-orbit
                 aria-hidden="true"></div>

            <div class="ed-experience-watermark"
                 data-ed-experience-watermark
                 aria-hidden="true">
                Editions
            </div>

            <div class="ed-experience-label editions-label">
                <span>03</span>
                <span>{{ trans('shop.experience.eyebrow') }}</span>
            </div>

            <div class="ed-experience-intro"
                 data-ed-experience-intro>
                <h2>
                    <span>{{ trans('shop.experience.title.0') }}</span>
                    <em>{{ trans('shop.experience.title.1') }}</em>
                </h2>
            </div>

            <div class="ed-experience-visual"
                 data-ed-experience-visual>

                <div class="ed-experience-shadow"
                     data-ed-experience-shadow
                     aria-hidden="true"></div>

                <div class="ed-experience-book"
                     data-ed-experience-book>

                    @include('woocommerce.partials.book', [
                        'book' => $book,
                        'loading' => 'lazy',
                    ])

                </div>

            </div>

            <div class="ed-experience-details"
                 data-ed-experience-details>

                <span class="editions-label">
                    {{ trans('shop.experience.caption') }}
                </span>

                <h3>{{ $book->get_name() }}</h3>

                <p>{{ trans('shop.experience.description') }}</p>

                <a href="{{ $book->get_permalink() }}">
                    {{ trans('shop.experience.action') }}
                    <span aria-hidden="true">↗</span>
                </a>

            </div>

            <div class="ed-experience-bottom editions-label">
                <span>Nemanja Editions</span>
                <span>03 / 05</span>
            </div>

        </div>

    </section>
@endif
