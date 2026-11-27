<article class="ed-collection-item" data-ed-collection-item>

    <a class="ed-collection-visual"
       href="{{ $book->get_permalink() }}"
       aria-label="{{ $book->get_name() }}">

        <div class="ed-collection-orbit" aria-hidden="true"></div>

        <div class="ed-collection-number" aria-hidden="true">
            {{ sprintf('%02d', $index) }}
        </div>

        <div class="ed-collection-shadow"
             aria-hidden="true"></div>

        <div class="ed-collection-book"
             data-ed-collection-book>

            @if ($book->get_image_id())

                @include('woocommerce.partials.book', [
                    'book' => $book,
                    'loading' => 'lazy',
                ])

            @else

                {!! $book->get_image('large') !!}

            @endif

        </div>

        <span class="ed-collection-volume editions-label">
            {{ trans('shop.collection.volume') }}
            {{ sprintf('%02d', $index) }}
        </span>

        <span class="ed-collection-arrow" aria-hidden="true">
            ↗
        </span>

    </a>

    <div class="ed-collection-copy" data-ed-collection-copy>

        <span class="editions-label ed-collection-edition">
            {{ trans('shop.collection.edition') }}
        </span>

        <h3>
            <a href="{{ $book->get_permalink() }}">
                {{ $book->get_name() }}
            </a>
        </h3>

        @if ($book->get_short_description())
            <p>
                {{ wp_trim_words(wp_strip_all_tags($book->get_short_description()), 35) }}
            </p>
        @endif

        @if ($book->get_price_html())
            <div class="ed-collection-price">
                {!! $book->get_price_html() !!}
            </div>
        @endif

        <a class="ed-collection-action"
           href="{{ $book->get_permalink() }}">

            <span>{{ trans('shop.collection.action') }}</span>
            <span aria-hidden="true">↗</span>

        </a>

    </div>

</article>
