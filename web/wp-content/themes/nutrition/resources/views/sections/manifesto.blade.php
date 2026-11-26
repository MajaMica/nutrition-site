<section class="manifesto" data-manifesto>
    <div class="manifesto-inner">
        <div class="manifesto-intro">
            <span class="manifesto-label type-label" data-reveal>
                {{ trans('home.manifesto.eyebrow') }}
            </span>

            <h2 class="manifesto-title">
                <span class="manifesto-line">
                    <span>{{ trans('home.manifesto.title.0') }}</span>
                </span>

                <span class="manifesto-line">
                    <span>{{ trans('home.manifesto.title.1') }}</span>
                </span>
            </h2>

            <p class="manifesto-lead type-body" data-reveal>
                {{ trans('home.manifesto.lead') }}
            </p>
        </div>

        <div class="manifesto-details">
            <h3 class="type-subheading" data-reveal>
                {{ trans('home.manifesto.subtitle.0') }}<br>
                {{ trans('home.manifesto.subtitle.1') }}
            </h3>

            <div class="manifesto-copy" data-reveal>
                <p>
                    {{ trans('home.manifesto.paragraphs.0') }}
                </p>

                <p>
                    {{ trans('home.manifesto.paragraphs.1') }}
                </p>

                <a
                    href="{{ home_url('/about/') }}"
                    class="manifesto-link"
                >
                    {{ trans('home.manifesto.cta') }}
                    <span aria-hidden="true">↗</span>
                </a>
            </div>
        </div>
    </div>
</section>