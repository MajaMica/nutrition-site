@php
    $chapters = [
        [
            'number' => '01',
            'image' => 'strength.webp',
            'layout' => 'portrait',
        ],
        [
            'number' => '02',
            'image' => 'nutrition.webp',
            'layout' => 'landscape',
        ],
        [
            'number' => '03',
            'image' => 'coaching.webp',
            'layout' => 'portrait',
        ],
        [
            'number' => '04',
            'image' => 'balance.webp',
            'layout' => 'landscape',
        ],
    ];
@endphp

<section id="performance" class="performance" data-performance>
    <div class="performance-stage" data-performance-stage>

        <div class="performance-ambient" aria-hidden="true">
            <span></span>
            <span></span>
        </div>

        <div class="performance-track" data-performance-track>

            <div class="performance-intro">

                <span class="type-label performance-eyebrow">
                    {{ trans('home.performance.eyebrow') }}
                </span>

                <h2 class="performance-heading">
                    {{ trans('home.performance.title.0') }}
                    <em>{{ trans('home.performance.title.1') }}</em>
                </h2>

                <p class="type-body performance-lead">
                    {{ trans('home.performance.lead') }}
                </p>

                <div class="performance-scroll-hint">
                    <span>
                        {{ trans('home.performance.scroll') }}
                    </span>
                    <span aria-hidden="true">⟶</span>
                </div>

            </div>

            @foreach ($chapters as $chapter)
                <article
                    class="performance-panel performance-panel--{{ $chapter['layout'] }}"
                    data-performance-panel
                >

                    <span
                        class="performance-number"
                        aria-hidden="true"
                        data-performance-number
                    >
                        {{ $chapter['number'] }}
                    </span>

                    <figure class="performance-image">
                        <img
                            src="{{ Vite::asset('resources/images/performance/' . $chapter['image']) }}"
                            alt="{{ trans('home.performance.chapters.' . $loop->index . '.alt') }}"
                            loading="lazy"
                            decoding="async"
                            data-performance-image
                        >
                    </figure>

                    <div class="performance-copy">

                        <span class="type-label performance-label">
                            {{ $chapter['number'] }} /
                            {{ trans('home.performance.chapters.' . $loop->index . '.label') }}
                        </span>

                        <h3 class="performance-title">
                            {{ trans('home.performance.chapters.' . $loop->index . '.title') }}
                        </h3>

                        <p class="type-body">
                            {{ trans('home.performance.chapters.' . $loop->index . '.description') }}
                        </p>

                    </div>

                </article>
            @endforeach

        </div>

        <div class="performance-navigation">
            <span data-performance-counter>00</span>

            <div class="performance-progress">
                <span data-performance-progress></span>
            </div>

            <span>04</span>
        </div>

    </div>
</section>