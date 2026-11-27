<section id="collection" class="ed-collection" data-ed-collection>

    <div class="editions-container">

        <header class="ed-collection-header">

            <div class="ed-collection-label editions-label">
                <span>04</span>
                <span>{{ trans('shop.collection.eyebrow') }}</span>
            </div>

            <h2 data-ed-collection-title>
                <span>{{ trans('shop.collection.title.0') }}</span>
                <em>{{ trans('shop.collection.title.1') }}</em>
            </h2>

            <p>{{ trans('shop.collection.description') }}</p>

        </header>

        @php
            woocommerce_output_all_notices();
        @endphp

        <div class="ed-collection-grid">

            @if (woocommerce_product_loop())

                @php($index = 0)

                @while (have_posts())

                    @php
                        the_post();
                        $book = wc_get_product(get_the_ID());
                    @endphp

                    @if ($book && $book->is_visible())

                        @php($index++)

                        @include('woocommerce.partials.collection-item', [
                            'book' => $book,
                            'index' => $index,
                        ])

                    @endif

                @endwhile

            @else

                @php(do_action('woocommerce_no_products_found'))

            @endif

        </div>

        @php(woocommerce_pagination())

        <div class="ed-collection-bottom editions-label">
            <span>{{ trans('shop.collection.statement') }}</span>
            <span>04 / 05</span>
        </div>

    </div>

</section>
