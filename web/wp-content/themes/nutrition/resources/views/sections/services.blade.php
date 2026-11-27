
@php
    $chapters = [
        [
            'label' => trans('home.services.chapters.0.label'),
            'title' => trans('home.services.chapters.0.title'),
            'description' => trans('home.services.chapters.0.description'),
        ],
        [
            'label' => trans('home.services.chapters.1.label'),
            'title' => trans('home.services.chapters.1.title'),
            'description' => trans('home.services.chapters.1.description'),
        ],
        [
            'label' => trans('home.services.chapters.2.label'),
            'title' => trans('home.services.chapters.2.title'),
            'description' => trans('home.services.chapters.2.description'),
        ],
    ];

    $sequenceUrl = get_theme_file_uri('public/storytelling/services');
@endphp

<section id="services"
    class="services-film section-transition-source"
    data-services
    data-sequence-url="{{ $sequenceUrl }}"
>
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

        <img
            class="services-film-first-frame"
            src="{{ $sequenceUrl }}/frames/frame_000000.webp"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
        >

        <canvas
            class="services-film-canvas"
            data-services-canvas
            aria-hidden="true"
        ></canvas>

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
