<section
    id="about"
    class="chef-note"
    data-chef-note
>
    <div class="chef-note-stage">

        <div class="chef-note-ambient" aria-hidden="true"></div>

        <div
            class="chef-note-watermark"
            aria-hidden="true"
            data-note-watermark
        >
            NEMANJA
        </div>

        <figure class="chef-note-media" data-note-media>
            <img
                src="{{ Vite::asset('resources/images/chef-note/nemanja.webp') }}"
                alt="{{ trans('home.chef_note.image_alt') }}"
                loading="lazy"
                decoding="async"
                width="1536"
                height="1024"
                data-note-image
            >
        </figure>

        <div class="chef-note-inner">

            <div class="chef-note-copy">

                <span
                    class="type-label chef-note-eyebrow"
                    data-note-eyebrow
                >
                    {{ trans('home.chef_note.eyebrow') }}
                </span>

                <span
                    class="chef-note-mark"
                    aria-hidden="true"
                    data-note-mark
                >“</span>

                <blockquote class="chef-note-quote">

                    <div class="chef-note-mask">
                        <p data-note-first>
                            {{ trans('home.chef_note.quote_first') }}
                        </p>
                    </div>

                    <div class="chef-note-mask">
                        <p data-note-second>
                            <em>
                                {{ trans('home.chef_note.quote_second') }}
                            </em>
                        </p>
                    </div>

                </blockquote>

                <div class="chef-note-author" data-note-author>
                    <span aria-hidden="true"></span>
                    <cite>Chef Nemanja</cite>
                </div>

            </div>

        </div>

    </div>
</section>