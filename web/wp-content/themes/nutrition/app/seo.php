<?php

namespace App;

function seo_home_data(): array
{
    $language = current_language();

    $translations = [
        'en' => [
            'title' => 'Private Chef in Abu Dhabi | Nemanja Chef',
            'description' => 'Personalized private chef services in Abu Dhabi, combining culinary expertise, balanced nutrition and a performance-focused approach for athletes and active lifestyles.',
            'locale' => 'en_US',
        ],
        'sr' => [
            'title' => 'Privatni kuvar u Abu Dabiju | Nemanja Chef',
            'description' => 'Personalizovane usluge privatnog kuvara u Abu Dabiju, uz spoj kulinarskog iskustva, balansirane ishrane i pristupa prilagođenog sportistima i aktivnom načinu života.',
            'locale' => 'sr_RS',
        ],
    ];

    $data = $translations[$language] ?? $translations['en'];

    $data['url'] = function_exists('pll_home_url')
        ? pll_home_url($language)
        : home_url('/');

    $data['image'] = get_theme_file_uri(
        'resources/images/seo/social-cover.jpg'
    );

    return $data;
}

add_filter('pre_get_document_title', function ($title) {
    return is_front_page()
        ? seo_home_data()['title']
        : $title;
});

add_action('wp_head', function () {
    if (! has_site_icon()) {
        $icon = get_theme_file_uri(
            'resources/images/seo/favicon.png'
        );

        printf(
            '<link rel="icon" type="image/png" sizes="512x512" href="%s">' . PHP_EOL,
            esc_url($icon)
        );

        printf(
            '<link rel="apple-touch-icon" href="%s">' . PHP_EOL,
            esc_url($icon)
        );
    }

    if (! is_front_page()) {
        return;
    }

    $data = seo_home_data();

    printf(
        '<meta name="description" content="%s">' . PHP_EOL,
        esc_attr($data['description'])
    );

    if (is_home()) {
        printf(
            '<link rel="canonical" href="%s">' . PHP_EOL,
            esc_url($data['url'])
        );
    }

    $openGraph = [
        'og:type' => 'website',
        'og:site_name' => 'Nemanja Chef',
        'og:title' => $data['title'],
        'og:description' => $data['description'],
        'og:url' => $data['url'],
        'og:locale' => $data['locale'],
        'og:image' => $data['image'],
        'og:image:type' => 'image/jpeg',
        'og:image:width' => '1200',
        'og:image:height' => '630',
        'og:image:alt' => 'Chef Nemanja',
    ];

    foreach ($openGraph as $property => $content) {
        printf(
            '<meta property="%s" content="%s">' . PHP_EOL,
            esc_attr($property),
            esc_attr($content)
        );
    }

    $twitter = [
        'twitter:card' => 'summary_large_image',
        'twitter:title' => $data['title'],
        'twitter:description' => $data['description'],
        'twitter:image' => $data['image'],
    ];

    foreach ($twitter as $name => $content) {
        printf(
            '<meta name="%s" content="%s">' . PHP_EOL,
            esc_attr($name),
            esc_attr($content)
        );
    }

    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'ProfessionalService',
        'name' => 'Nemanja Chef',
        'url' => $data['url'],
        'image' => $data['image'],
        'description' => $data['description'],
        'areaServed' => [
            '@type' => 'City',
            'name' => 'Abu Dhabi',
        ],
        'sameAs' => [
            'https://www.instagram.com/wellness_chef_nemanja/',
            'https://www.linkedin.com/in/nemanja-ljubisavljevic-3a9405293/',
        ],
    ];

    printf(
        '<script type="application/ld+json">%s</script>' . PHP_EOL,
        wp_json_encode(
            $schema,
            JSON_UNESCAPED_UNICODE |
            JSON_UNESCAPED_SLASHES |
            JSON_HEX_TAG
        )
    );
}, 5);
