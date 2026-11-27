@php
    $chapters = [
        [
            'number' => '01',
            'label' => trans('home.philosophy.chapters.0.label'),
            'title' => trans('home.philosophy.chapters.0.title'),
            'description' => trans('home.philosophy.chapters.0.description'),
            'image' => 'mixfood.webp',
            'alt' => trans('home.philosophy.chapters.0.alt'),
        ],
        [
            'number' => '02',
            'label' => trans('home.philosophy.chapters.1.label'),
            'title' => trans('home.philosophy.chapters.1.title'),
            'description' => trans('home.philosophy.chapters.1.description'),
            'image' => 'medicine.webp',
            'alt' => trans('home.philosophy.chapters.1.alt'),
        ],
        [
            'number' => '03',
            'label' => trans('home.philosophy.chapters.2.label'),
            'title' => trans('home.philosophy.chapters.2.title'),
            'description' => trans('home.philosophy.chapters.2.description'),
            'image' => 'nemanja001.webp',
            'alt' => trans('home.philosophy.chapters.2.alt'),
        ],
    ];
@endphp

<section id="about" class="philosophy" data-philosophy>
    <div class="philosophy-visual" data-philosophy-visual>
        @foreach ($chapters as $chapter)
            <div
                class="philosophy-image"
                data-philosophy-image="{{ $loop->index }}"
            >
                <img
                    src="{{ Vite::asset('resources/images/philosophy/' . $chapter['image']) }}"
                    alt="{{ $chapter['alt'] }}"
                    loading="lazy"
                    decoding="async"
                >
            </div>
        @endforeach

        <div class="philosophy-overlay"></div>

        <div class="philosophy-caption type-label">
            {{ trans('home.philosophy.caption') }}
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