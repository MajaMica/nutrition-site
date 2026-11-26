@php
    $chapters = [
        [
            'number' => '01',
            'label' => 'The craft',
            'title' => 'Crafted with purpose.',
            'description' => 'Exceptional food begins with thoughtfully selected ingredients, respect for nature and attention to every detail. Quality is not an addition. It is the foundation.',
            'image' => 'mixfood.webp',
            'alt' => 'A selection of fresh and diverse ingredients',
        ],
        [
            'number' => '02',
            'label' => 'The science',
            'title' => 'Food as medicine.',
            'description' => 'Beyond flavour, food plays a fundamental role in wellbeing, recovery and performance. Combining culinary expertise with nutritional science, every ingredient serves a greater purpose.',
            'image' => 'medicine.webp',
            'alt' => 'Golden infusion and natural ingredients',
        ],
        [
            'number' => '03',
            'label' => 'The individual',
            'title' => 'Built around you.',
            'description' => 'Your lifestyle. Your training. Your ambitions. A deeply personal approach to nutrition, shaped around who you are, how you live and what you want to achieve.',
            'image' => 'nemanja001.webp',
            'alt' => 'Nemanja, private chef and nutrition specialist',
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
                    src="{{ Vite::asset('resources/images/philosophy/' . $chapter['image']) }}"
                    alt="{{ $chapter['alt'] }}"
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