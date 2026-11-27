@php
    $email = '';

    $channels = [
        [
            'key' => 'whatsapp',
            'name' => 'WhatsApp',
            'value' => '+971 55 379 0163',
            'url' => 'https://wa.me/971553790163',
            'external' => true,
        ],
        [
            'key' => 'phone',
            'name' => trans('home.contact.action') === 'Kontakt' ? 'Telefon' : 'Phone',
            'value' => '+971 55 379 0163',
            'url' => 'tel:+971553790163',
            'external' => false,
        ],
        [
            'key' => 'email',
            'name' => 'Email',
            'value' => $email,
            'url' => $email ? 'mailto:' . $email : '',
            'external' => false,
        ],
        [
            'key' => 'instagram',
            'name' => 'Instagram',
            'value' => '@wellness_chef_nemanja',
            'url' => 'https://www.instagram.com/wellness_chef_nemanja/',
            'external' => true,
        ],
        [
            'key' => 'linkedin',
            'name' => 'LinkedIn',
            'value' => 'Nemanja Ljubisavljevic',
            'url' => 'https://www.linkedin.com/in/nemanja-ljubisavljevic-3a9405293/',
            'external' => true,
        ],
    ];

    $channels = array_values(array_filter(
        $channels,
        fn ($channel) => !empty($channel['url'])
    ));
@endphp

<section id="contact" class="contact-orbit" data-contact>

    <div class="contact-stage" data-contact-stage>

        <div class="contact-atmosphere" aria-hidden="true"></div>

        <div class="contact-top">

            <span class="type-label">
                08 — {{ trans('home.contact.eyebrow') }}
            </span>

            <span class="type-label">
                {{ trans('common.brand.location') }}
            </span>

        </div>

        <div class="contact-orbits" aria-hidden="true">

            <div class="contact-orbit-ring" data-contact-ring>
                <span></span>
            </div>

            <div class="contact-orbit-ring" data-contact-ring>
                <span></span>
            </div>

            <div class="contact-orbit-ring" data-contact-ring>
                <span></span>
            </div>

            <div class="contact-orbit-ring" data-contact-ring>
                <span></span>
            </div>

        </div>

        <div class="contact-scenes">

            <article class="contact-scene contact-intro" data-contact-scene>

                <span class="contact-scene-label type-label">
                    {{ trans('home.contact.eyebrow') }}
                </span>

                <h2 class="contact-title">
                    {{ trans('home.contact.title') }}
                </h2>

                <p class="contact-description">
                    {{ trans('home.contact.lead') }}
                </p>

                <a
                    class="contact-action"
                    href="{{ $channels[0]['url'] }}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="{{ trans('home.contact.action') }}"
                >
                    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <path
                            d="M7 25L25 7M7 7H25V25"
                            stroke="currentColor"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </a>

            </article>

            @foreach ($channels as $channel)

                <article
                    class="contact-scene"
                    data-contact-scene
                >

                    <span class="contact-scene-label type-label">
                        {{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}
                        — {{ trans('home.contact.action') }}
                    </span>

                    <h3 class="contact-title">
                        {{ $channel['name'] }}<em>.</em>
                    </h3>

                    <p class="contact-description">
                        {{ trans('home.contact.channels.' . $channel['key']) }}
                    </p>

                    <a
                        class="contact-value"
                        href="{{ $channel['url'] }}"
                        @if ($channel['external'])
                            target="_blank"
                            rel="noopener noreferrer"
                        @endif
                    >
                        {{ $channel['value'] }}
                    </a>

                    <a
                        class="contact-action"
                        href="{{ $channel['url'] }}"
                        aria-label="{{ $channel['name'] }}"
                        @if ($channel['external'])
                            target="_blank"
                            rel="noopener noreferrer"
                        @endif
                    >
                        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                            <path
                                d="M7 25L25 7M7 7H25V25"
                                stroke="currentColor"
                                stroke-width="1.4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </a>

                </article>

            @endforeach

        </div>

        <div class="contact-bottom">

            <nav class="contact-navigation" aria-label="{{ trans('home.contact.action') }}">

                @foreach ($channels as $channel)

                    <a
                        href="{{ $channel['url'] }}"
                        data-contact-link="{{ $loop->iteration }}"
                        @if ($channel['external'])
                            target="_blank"
                            rel="noopener noreferrer"
                        @endif
                    >
                        <span>
                            {{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}
                        </span>

                        {{ $channel['name'] }}
                    </a>

                @endforeach

            </nav>

            <div class="contact-progress">

                <span data-contact-counter>01</span>

                <div class="contact-progress-track">
                    <span data-contact-progress></span>
                </div>

                <span>
                    {{ str_pad(count($channels) + 1, 2, '0', STR_PAD_LEFT) }}
                </span>

            </div>

        </div>

    </div>

</section>