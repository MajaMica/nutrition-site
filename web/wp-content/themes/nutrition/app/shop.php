<?php

namespace App;

function is_editions_page(): bool
{
    if (! class_exists('WooCommerce')) {
        return false;
    }

    return is_woocommerce()
        || is_cart()
        || is_checkout()
        || is_account_page();
}

function editions_url(): string
{
    return wc_get_page_permalink('shop');
}

function editions_home_url(): string
{
    return function_exists('pll_home_url')
        ? pll_home_url()
        : home_url('/');
}

function editions_cart_count(): int
{
    return WC()->cart
        ? WC()->cart->get_cart_contents_count()
        : 0;
}
function editions_featured_book(): ?\WC_Product
{
    if (! function_exists('wc_get_products')) {
        return null;
    }

    $args = [
        'status' => 'publish',
        'visibility' => 'visible',
        'limit' => 1,
        'orderby' => 'date',
        'order' => 'DESC',
    ];

    $products = wc_get_products(array_merge($args, [
        'featured' => true,
    ]));

    if (empty($products)) {
        $products = wc_get_products($args);
    }

    return $products[0] ?? null;
}