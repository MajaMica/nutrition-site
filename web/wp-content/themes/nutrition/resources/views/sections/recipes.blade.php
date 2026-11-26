@php
    $recipes = [
        [
            'number' => '01',
            'category' => 'Plant-based',
            'title' => 'Naturally nourishing.',
            'image' => 'recipe001.webp',
        ],
        [
            'number' => '02',
            'category' => 'Balanced nutrition',
            'title' => 'Everyday excellence.',
            'image' => 'recipe002.webp',
        ],
        [
            'number' => '03',
            'category' => 'Culinary craft',
            'title' => 'Beyond the ordinary.',
            'image' => 'recipe004.webp',
        ],
        [
            'number' => '04',
            'category' => 'Refined dining',
            'title' => 'The beauty of simplicity.',
            'image' => 'recipe003.webp',
        ],
        [
            'number' => '05',
            'category' => 'Mediterranean inspiration',
            'title' => 'Inspired by nature.',
            'image' => 'recipe005.webp',
        ],
    ];
@endphp

<section class="culinary-journal" data-journal>
    <div class="journal-inner">

        <header class="journal-header" data-journal-header>
            <span class="type-label journal-eyebrow">
                The culinary journal
            </span>

            <h2 class="journal-heading">
                Food with<br>
                <em>a purpose.</em>
            </h2>

            <p class="type-body journal-lead">
                A collection of culinary creations inspired
                by balance, individuality and the pleasure
                of eating well.
            </p>
        </header>

        <div class="journal-grid">
            @foreach ($recipes as $recipe)
                <article
                    class="journal-item journal-item-{{ $loop->iteration }}"
                    data-journal-item
                >
                    <figure class="journal-figure" data-journal-figure>
                        <img
                            src="{{ Vite::asset('resources/images/recipes/' . $recipe['image']) }}"
                            alt="{{ $recipe['category'] }}"
                            loading="lazy"
                            decoding="async"
                        >
                    </figure>

                    <div class="journal-meta">
                        <span class="type-label">
                            {{ $recipe['number'] }} —
                            {{ $recipe['category'] }}
                        </span>

                        <h3>{{ $recipe['title'] }}</h3>
                    </div>
                </article>
            @endforeach
        </div>

        <div class="journal-footer">
            <span class="type-label">
                Thoughtfully created. Personally inspired.
            </span>

            <a
                href="{{ home_url('/recipes/') }}"
                class="journal-link"
            >
                Explore the culinary journal
                <span aria-hidden="true">↗</span>
            </a>
        </div>

    </div>
</section>