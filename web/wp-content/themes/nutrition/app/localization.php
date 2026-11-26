<?php

namespace App;

function current_language(): string
{
    $language = function_exists('pll_current_language')
        ? pll_current_language('slug')
        : 'en';

    return in_array($language, ['en', 'sr', 'ru'], true)
        ? $language
        : 'en';
}

add_action('wp', function () {
    app()->setLocale(current_language());
    app('translator')->setFallback('en');
}, 5);