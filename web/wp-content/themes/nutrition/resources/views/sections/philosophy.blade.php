@php
    $chapters = [
        [
            'number' => '01',
            'label' => 'The craft',
            'title' => 'Crafted with purpose.',
            'description' => 'Thoughtful ingredients, refined techniques and attention to every detail. Exceptional food begins long before it reaches the plate.',
            'image' => 'food001.webp',
        ],
        [
            'number' => '02',
            'label' => 'The science',
            'title' => 'Beyond flavour.',
            'description' => 'Bringing culinary craftsmanship and personalised nutrition together to support an active, balanced lifestyle without compromising on taste.',
            'image' => 'food003.webp',
        ],
        [
            'number' => '03',
            'label' => 'The individual',
            'title' => 'Built around you.',
            'description' => 'Your lifestyle. Your training. Your ambitions. A personal approach to food that reflects the way you live and what you want to achieve.',
            'image' => 'food005.webp',
        ],
    ];
@endphp

<section class="philosophy" data-philosophy>
    <div class="philosophy-visual" data-philosophy-visual>
        @foreach ($chapters as $chapter)
            <div
                class="philosophy-image"
                data-philosophy-image="{{ $loop->index }}"
            >
                <img
                    src="{{ Vite::asset('resources/images/food/' . $chapter['image']) }}"
                    alt=""
                    loading="lazy"
                    decoding="async"
                >
            </div>
        @endforeach

        <div class="philosophy-overlay"></div>

        <div class="philosophy-caption type-label">
            The art of living well
        </div>
    </div>

    <div class="philosophy-chapters">
        @foreach ($chapters as $chapter)
            <article
                class="philosophy-chapter"
                data-philosophy-chapter="{{ $loop->index }}"
            >
                <div class="philosophy-chapter-inner">
                    <div class="philosophy-label type-label">
                        <span></span>
                        {{ $chapter['number'] }} — {{ $chapter['label'] }}
                    </div>

                    <h2 class="philosophy-title type-heading">
                        @foreach (explode(' ', $chapter['title']) as $word)
                            <span class="philosophy-word">
                                <span>{{ $word }}</span>
                            </span>
                        @endforeach
                    </h2>

                    <p class="philosophy-description type-body">
                        {{ $chapter['description'] }}
                    </p>
                </div>
            </article>
        @endforeach
    </div>
</section>