<?php

namespace App;

function is_storytelling_home(): bool
{
    return ! is_admin()
        && ! is_customize_preview()
        && is_front_page()
        && ! is_editions_page();
}

add_filter('woocommerce_enqueue_styles', function ($styles) {
    return is_storytelling_home() ? [] : $styles;
});

add_action('wp_enqueue_scripts', function () {
    if (! is_storytelling_home()) {
        return;
    }

    $styles = [
        'wp-block-library',
        'wp-block-library-theme',
        'wc-blocks-style',
        'woocommerce-general',
        'woocommerce-layout',
        'woocommerce-smallscreen',
        'pll-language-switcher',
        'pll-navigation-language-switcher',
    ];

    foreach ($styles as $style) {
        wp_dequeue_style($style);
    }

    $scripts = [
        'wc-add-to-cart',
        'wc-cart-fragments',
        'woocommerce',
        'wc-order-attribution',
        'sourcebuster-js',
    ];

    foreach ($scripts as $script) {
        wp_dequeue_script($script);
    }
}, 999);
