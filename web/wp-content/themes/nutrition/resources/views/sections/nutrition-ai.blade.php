<section
    class="nutrition-ai section-transition"
    data-nutrition-ai
>
    <div class="nutrition-ai-stage" data-ai-stage>

        <div class="nutrition-ai-atmosphere" aria-hidden="true">
            <div class="nutrition-ai-glow"></div>

            <div class="nutrition-ai-orbits" data-ai-orbits>
                @for ($i = 0; $i < 5; $i++)
                    <span></span>
                @endfor
            </div>
        </div>

        <div class="nutrition-ai-scene" data-ai-scene>

            <div class="nutrition-ai-awakening">
                <span class="nutrition-ai-core" data-ai-core aria-hidden="true">
                    ✳
                </span>

                <span class="type-label nutrition-ai-label">
                    {{ trans('home.nutrition_app.ai.label') }}
                </span>
            </div>

        </div>

        <div class="nutrition-ai-scene" data-ai-scene>

            <div class="nutrition-ai-statement">
                <span class="type-label nutrition-ai-label">
                    {{ trans('home.nutrition_app.ai.label') }}
                </span>

                <h2 class="nutrition-ai-title">
                    <span data-ai-word>
                        {{ trans('home.nutrition_app.ai.title.0') }}
                    </span>

                    <em data-ai-word>
                        {{ trans('home.nutrition_app.ai.title.1') }}
                    </em>
                </h2>

                <p class="type-body" data-ai-word>
                    {{ trans('home.nutrition_app.ai.description') }}
                </p>
            </div>

        </div>

        <div class="nutrition-ai-scene" data-ai-scene>

            <div class="nutrition-ai-conversation">

                <div class="nutrition-ai-conversation-header">
                    <span class="nutrition-ai-symbol" aria-hidden="true">✳</span>

                    <span class="type-label">
                        {{ trans('home.nutrition_app.ai.assistant') }}
                    </span>
                </div>

                <div class="nutrition-ai-message" data-ai-message>
                    {{ trans('home.nutrition_app.ai.message') }}
                </div>

                <div class="nutrition-ai-response" data-ai-response>
                    <span class="nutrition-ai-symbol" aria-hidden="true">✳</span>

                    <div>
                        <p>
                            {{ trans('home.nutrition_app.ai.response') }}
                        </p>

                        <div class="nutrition-ai-lines" aria-hidden="true">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <span class="nutrition-ai-preview-label">
                    {{ trans('home.nutrition_app.ai.preview') }}
                </span>

            </div>

        </div>

        <div class="nutrition-ai-scene" data-ai-scene>

            <div class="nutrition-ai-ending">
                <span class="nutrition-ai-symbol" aria-hidden="true">✳</span>

                <h3>
                    {{ trans('home.nutrition_app.ai.status') }}
                </h3>

                <span class="nutrition-ai-ending-line"></span>
            </div>

        </div>

        <div class="nutrition-ai-navigation" aria-hidden="true">
            <span data-ai-counter>01</span>

            <div class="nutrition-ai-progress">
                <span data-ai-progress></span>
            </div>

            <span>04</span>
        </div>

    </div>
</section>