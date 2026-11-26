@php
    $chapters = [
        [
            'label' => 'The craft',
            'title' => 'Crafted with intention.',
            'description' => 'Every ingredient. Every detail. Every decision.',
        ],
        [
            'label' => 'The performance',
            'title' => 'Fuel your potential.',
            'description' => 'Where culinary expertise meets purposeful nutrition.',
        ],
        [
            'label' => 'The experience',
            'title' => 'Made for you.',
            'description' => 'Private dining. Personalised nutrition. Your lifestyle.',
        ],
    ];
@endphp

<section class="services-film" data-services>
    <div class="services-film-stage" data-services-stage>

        <video
            class="services-film-video"
            data-services-video
            poster="{{ Vite::asset('resources/images/services/private-chef.webp') }}"
            muted
            playsinline
            preload="auto"
            aria-hidden="true"
        >
            <source
                src="{{ Vite::asset('resources/videos/services/private-chef.mp4') }}"
                type="video/mp4"
            >
        </video>

        <div class="services-film-overlay"></div>

        <div class="services-film-story">
            @foreach ($chapters as $chapter)
                <div
                    class="services-film-chapter"
                    data-services-chapter
                >
                    <span class="services-film-label type-label">
                        {{ $chapter['label'] }}
                    </span>

                    <h2 class="services-film-title type-hero">
                        {{ $chapter['title'] }}
                    </h2>

                    <p class="services-film-description type-body">
                        {{ $chapter['description'] }}
                    </p>
                </div>
            @endforeach
        </div>

    </div>
</section>