<section
    class="cinematic-section"
    data-hero
    data-sequence-url="{{ get_theme_file_uri('public/storytelling') }}"
    data-hero-titles="{{ wp_json_encode(trans('home.hero.titles'), JSON_UNESCAPED_UNICODE) }}"
>
    <div class="cinematic-stage" data-hero-stage>

        <canvas
            class="hero-canvas absolute-fill"
            data-hero-canvas
            aria-hidden="true"
        ></canvas>

        <div class="hero-overlay absolute-fill"></div>

        <div class="hero-content absolute-fill content-center">
            <h1 class="type-hero" data-hero-title>
                {{ trans('home.hero.titles.0') }}
            </h1>
        </div>

        <div class="hero-scroll">
            <span class="type-label">
                {{ trans('home.hero.scroll') }}
            </span>

            <span class="hero-scroll-line"></span>
        </div>

    </div>
</section>