@php
    $services = [
        [
            'number' => '01',
            'label' => 'The experience',
            'title' => 'Private Chef.',
            'description' => 'Exceptional dining, in the comfort of your own space. A personal culinary experience shaped around your tastes and lifestyle.',
            'image' => 'food002.webp',
            'link' => 'Discover the experience',
            'url' => '/services/',
        ],
        [
            'number' => '02',
            'label' => 'The performance',
            'title' => 'Fuel your potential.',
            'description' => 'Purposeful nutrition for athletes and active lifestyles. Where exceptional flavour meets the demands of training and everyday performance.',
            'image' => 'food004.webp',
            'link' => 'Explore performance nutrition',
            'url' => '/services/',
        ],
        [
            'number' => '03',
            'label' => 'The individual',
            'title' => 'Made for you.',
            'description' => 'Personalised meal planning that fits your life, not the other way around. Your preferences, your routine, your goals.',
            'image' => 'food005.webp',
            'link' => 'Explore personalised nutrition',
            'url' => '/services/',
        ],
    ];
@endphp

<section class="services" data-services>
    <div class="services-stage" data-services-stage>
        <div class="services-track" data-services-track>
            @foreach ($services as $service)
                <article class="services-panel" data-services-panel>
                    <div class="services-image">
                        <img
                            src="{{ Vite::asset('resources/images/food/' . $service['image']) }}"
                            alt=""
                            loading="lazy"
                            decoding="async"
                        >
                    </div>

                    <div class="services-overlay"></div>

                    <div class="services-content">
                        <div class="services-label type-label">
                            {{ $service['number'] }} — {{ $service['label'] }}
                        </div>

                        <h2 class="services-title">
                            {{ $service['title'] }}
                        </h2>

                        <p class="services-description type-body">
                            {{ $service['description'] }}
                        </p>

                        <a
                            href="{{ home_url($service['url']) }}"
                            class="services-link"
                        >
                            {{ $service['link'] }}
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </article>
            @endforeach
        </div>

        <div class="services-navigation" aria-hidden="true">
            <span data-services-counter>01</span>

            <div class="services-progress">
                <span data-services-progress></span>
            </div>

            <span>
                {{ str_pad(count($services), 2, '0', STR_PAD_LEFT) }}
            </span>
        </div>
    </div>
</section>