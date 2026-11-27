@if ($book && $book->get_image_id())

    <div class="ed-book-object" data-ed-book>

        <div class="ed-book-front">
            {!! wp_get_attachment_image(
                $book->get_image_id(),
                'large',
                false,
                [
                    'class' => 'ed-book-cover',
                    'alt' => $book->get_name(),
                    'loading' => $loading ?? 'lazy',
                    'decoding' => 'async',
                    'fetchpriority' => ($loading ?? 'lazy') === 'eager'
                        ? 'high'
                        : 'auto',
                ]
            ) !!}
        </div>

        <div class="ed-book-back" aria-hidden="true"></div>
        <div class="ed-book-spine" aria-hidden="true"></div>
        <div class="ed-book-pages" aria-hidden="true"></div>
        <div class="ed-book-top" aria-hidden="true"></div>
        <div class="ed-book-bottom" aria-hidden="true"></div>

    </div>

@endif