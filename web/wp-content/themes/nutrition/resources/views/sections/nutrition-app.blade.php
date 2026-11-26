@php
    $features = [
        [
            'number' => '01',
            'label' => trans('home.nutrition_app.features.0.label'),
            'title' => trans('home.nutrition_app.features.0.title'),
            'description' => trans('home.nutrition_app.features.0.description'),
            'image' => 'app001.webp',
        ],
        [
            'number' => '02',
            'label' => trans('home.nutrition_app.features.1.label'),
            'title' => trans('home.nutrition_app.features.1.title'),
            'description' => trans('home.nutrition_app.features.1.description'),
            'image' => 'app002.webp',
        ],
        [
            'number' => '03',
            'label' => trans('home.nutrition_app.features.2.label'),
            'title' => trans('home.nutrition_app.features.2.title'),
            'description' => trans('home.nutrition_app.features.2.description'),
            'image' => 'app003.webp',
        ],
        [
            'number' => '04',
            'label' => trans('home.nutrition_app.features.3.label'),
            'title' => trans('home.nutrition_app.features.3.title'),
            'description' => trans('home.nutrition_app.features.3.description'),
            'image' => 'app004.webp',
        ],
    ];
@endphp

<section
    class="nutrition-app section-transition"
    data-nutrition-app
>
    <div class="nutrition-app-intro">
        <span class="type-label nutrition-app-eyebrow">
            {{ trans('home.nutrition_app.eyebrow') }}
        </span>

        <h2 class="nutrition-app-heading">
            {{ trans('home.nutrition_app.title.0') }}<br>
            <em>{{ trans('home.nutrition_app.title.1') }}</em>
        </h2>

        <p class="type-body nutrition-app-lead">
            {{ trans('home.nutrition_app.lead') }}
        </p>

        <span class="nutrition-app-badge type-label">
            <span></span>
            {{ trans('home.nutrition_app.badge') }}
        </span>
    </div>

    <div
    class="nutrition-app-story section-transition-source"
    data-app-story
>
        <div class="nutrition-app-stage" data-app-stage>

            <div class="nutrition-app-watermark" aria-hidden="true">
                {{ trans('home.nutrition_app.watermark') }}
            </div>

            <div class="nutrition-app-features">
                @foreach ($features as $feature)
                    <article
                        class="nutrition-app-feature"
                        data-app-feature="{{ $loop->index }}"
                    >
                        <span class="type-label nutrition-app-feature-label">
                            {{ $feature['number'] }} —
                            {{ $feature['label'] }}
                        </span>

                        <h3 class="nutrition-app-feature-title">
                            {{ $feature['title'] }}
                        </h3>

                        <p class="type-body">
                            {{ $feature['description'] }}
                        </p>
                    </article>
                @endforeach
            </div>

            <div class="nutrition-app-device-area">
                <div class="nutrition-app-device" data-app-device>
                    <div class="nutrition-app-screen">
                        @foreach ($features as $feature)
                            <img
                                src="{{ Vite::asset('resources/images/app/' . $feature['image']) }}"
                                class="nutrition-app-screenshot"
                                data-app-screen="{{ $loop->index }}"
                                alt="{{ trans('home.nutrition_app.screen_alt', ['number' => $feature['number']]) }}"
                                loading="lazy"
                                decoding="async"
                            >
                        @endforeach
                    </div>
                </div>

                <div class="nutrition-app-shadow"></div>
            </div>

            <div class="nutrition-app-navigation">
                <span data-app-counter>01</span>

                <div class="nutrition-app-progress">
                    <span data-app-progress></span>
                </div>

                <span>04</span>
            </div>

        </div>
    </div>

    <div
    class="nutrition-ai section-transition section-transition-source"
    data-nutrition-ai
    data-section-transition="[data-app-story]"
>
        <div class="nutrition-ai-inner">

            <div class="nutrition-ai-copy">
                <span class="type-label nutrition-ai-label">
                    {{ trans('home.nutrition_app.ai.label') }}
                </span>

                <h2 class="nutrition-ai-title">
                    {{ trans('home.nutrition_app.ai.title.0') }}
                    <em>{{ trans('home.nutrition_app.ai.title.1') }}</em>
                </h2>

                <p class="type-body">
                    {{ trans('home.nutrition_app.ai.description') }}
                </p>

                <span class="nutrition-ai-status type-label">
                    {{ trans('home.nutrition_app.ai.status') }}
                </span>
            </div>

            <div class="nutrition-ai-preview">
                <div class="nutrition-ai-preview-header">
                    <span class="nutrition-ai-symbol">✳</span>
                    {{ trans('home.nutrition_app.ai.assistant') }}
                    <span class="nutrition-ai-preview-dot"></span>
                </div>

                <div class="nutrition-ai-message">
                    {{ trans('home.nutrition_app.ai.message') }}
                </div>

                <div class="nutrition-ai-response">
                    <span class="nutrition-ai-symbol">✳</span>

                    <div>
                        <p>{{ trans('home.nutrition_app.ai.response') }}</p>

                        <div class="nutrition-ai-lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <div class="nutrition-ai-preview-footer">
                    {{ trans('home.nutrition_app.ai.preview') }}
                </div>
            </div>

        </div>
    </div>
</section>