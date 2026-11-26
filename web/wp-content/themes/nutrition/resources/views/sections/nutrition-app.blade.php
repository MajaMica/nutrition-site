@php
    $features = [
        [
            'number' => '01',
            'label' => 'Personalised nutrition',
            'title' => 'It starts with you.',
            'description' => 'Your goals, activity level and dietary preferences shape your daily calorie and macronutrient targets.',
            'image' => 'app001.webp',
        ],
        [
            'number' => '02',
            'label' => 'Daily insights',
            'title' => 'Know what fuels you.',
            'description' => 'Understand your daily energy needs and explore the nutritional value of the food you eat.',
            'image' => 'app002.webp',
        ],
        [
            'number' => '03',
            'label' => 'Recipes & meal planning',
            'title' => 'Make every meal count.',
            'description' => 'Discover recipes, explore ingredients and organise your meals around your lifestyle.',
            'image' => 'app003.webp',
        ],
        [
            'number' => '04',
            'label' => 'Nutritional intelligence',
            'title' => 'Every detail matters.',
            'description' => 'Adjust your portions and see how calories and macronutrients change with every ingredient.',
            'image' => 'app004.webp',
        ],
    ];
@endphp

<section class="nutrition-app" data-nutrition-app>
    <div class="nutrition-app-intro">
        <span class="type-label nutrition-app-eyebrow">
            The next chapter in nutrition
        </span>

        <h2 class="nutrition-app-heading">
            Your nutrition.<br>
            <em>Your potential.</em>
        </h2>

        <p class="type-body nutrition-app-lead">
            Culinary expertise meets intelligent technology.
            A more personal way to eat, plan and live well.
        </p>

        <span class="nutrition-app-badge type-label">
            <span></span>
            Coming soon
        </span>
    </div>

    <div class="nutrition-app-story" data-app-story>
        <div class="nutrition-app-stage" data-app-stage>

            <div class="nutrition-app-watermark" aria-hidden="true">
                Nutrition.
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
                                alt="Nutrition application preview {{ $feature['number'] }}"
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

    <div class="nutrition-ai" data-nutrition-ai>
        <div class="nutrition-ai-inner">

            <div class="nutrition-ai-copy">
                <span class="type-label nutrition-ai-label">
                    AI-powered nutrition — In development
                </span>

                <h2 class="nutrition-ai-title">
                    Intelligence meets
                    <em>individuality.</em>
                </h2>

                <p class="type-body">
                    We're developing an AI-powered nutrition
                    assistant designed to make nutritional
                    information more relevant to your goals,
                    preferences and everyday choices.
                </p>

                <span class="nutrition-ai-status type-label">
                    Coming soon
                </span>
            </div>

            <div class="nutrition-ai-preview">
                <div class="nutrition-ai-preview-header">
                    <span class="nutrition-ai-symbol">✳</span>
                    Nutrition Assistant
                    <span class="nutrition-ai-preview-dot"></span>
                </div>

                <div class="nutrition-ai-message">
                    What could I eat after my workout?
                </div>

                <div class="nutrition-ai-response">
                    <span class="nutrition-ai-symbol">✳</span>

                    <div>
                        <p>Personalised nutrition assistance</p>

                        <div class="nutrition-ai-lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <div class="nutrition-ai-preview-footer">
                    Concept preview — In development
                </div>
            </div>

        </div>
    </div>
</section>