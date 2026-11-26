<?php

use App\Providers\ThemeServiceProvider;
use Roots\Acorn\Application;

if (! file_exists($composer = __DIR__.'/vendor/autoload.php')) {
    wp_die(__('Error locating autoloader. Please run <code>composer install</code>.', 'sage'));
}

require $composer;

Application::configure()
    ->withProviders([
        ThemeServiceProvider::class,
    ])
    ->boot();

collect(['setup', 'filters', 'localization'])
    ->each(function ($file) {
        if (! locate_template($file = "app/{$file}.php", true, true)) {
            wp_die(
                sprintf(__('Error locating <code>%s</code> for inclusion.', 'sage'), $file)
            );
        }
    });