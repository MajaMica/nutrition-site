@php
    $recipes = [
        [
            'number' => '01',
            'category' => trans('home.journal.recipes.0.category'),
            'title' => trans('home.journal.recipes.0.title'),
            'image' => 'recipe001.webp',
        ],
        [
            'number' => '02',
            'category' => trans('home.journal.recipes.1.category'),
            'title' => trans('home.journal.recipes.1.title'),
            'image' => 'recipe002.webp',
        ],
        [
            'number' => '03',
            'category' => trans('home.journal.recipes.2.category'),
            'title' => trans('home.journal.recipes.2.title'),
            'image' => 'recipe004.webp',
        ],
        [
            'number' => '04',
            'category' => trans('home.journal.recipes.3.category'),
            'title' => trans('home.journal.recipes.3.title'),
            'image' => 'recipe003.webp',
        ],
        [
            'number' => '05',
            'category' => trans('home.journal.recipes.4.category'),
            'title' => trans('home.journal.recipes.4.title'),
            'image' => 'recipe005.webp',
        ],
    ];
@endphp

<section
    class="culinary-journal organic-surface section-transition"
    data-journal
    data-section-transition="[data-nutrition-ai]"
>
    @include('partials.organic-background')

    <div class="journal-inner">

        <header class="journal-header" data-journal-header>
            <span class="type-label journal-eyebrow">
                {{ trans('home.journal.eyebrow') }}
            </span>

            <h2 class="journal-heading">
                {{ trans('home.journal.title.0') }}<br>
                <em>{{ trans('home.journal.title.1') }}</em>
            </h2>

            <p class="type-body journal-lead">
                {{ trans('home.journal.lead') }}
            </p>
        </header>

        <div class="journal-stack" data-journal-stack>
            @foreach ($recipes as $recipe)
                <article
                    class="journal-stack-item"
                    style="--card-index: {{ $loop->index }}"
                    data-journal-card
                >
                    <div class="journal-card" data-journal-card-inner>

                        <figure class="journal-card-media">
                            <img
                                src="{{ Vite::asset('resources/images/recipes/' . $recipe['image']) }}"
                                alt="{{ $recipe['category'] }}"
                                loading="lazy"
                                decoding="async"
                            >
                        </figure>

                        <div class="journal-card-overlay"></div>

                        <div class="journal-card-content">
                            <span class="journal-card-accent"></span>

                            <span class="journal-card-number type-label">
                                {{ $recipe['number'] }}
                            </span>

                            <h3 class="journal-card-title">
                                {{ $recipe['title'] }}
                            </h3>

                            <span class="journal-card-category type-label">
                                {{ $recipe['category'] }}
                            </span>
                        </div>

                    </div>
                </article>
            @endforeach
        </div>

        <div class="journal-footer">
            <span class="type-label">
                {{ trans('home.journal.footer') }}
            </span>

            <a
                href="{{ home_url('/recipes/') }}"
                class="journal-link"
            >
                {{ trans('home.journal.cta') }}
                <span aria-hidden="true">↗</span>
            </a>
        </div>

    </div>
</section>