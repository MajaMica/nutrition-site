import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import laravel from 'laravel-vite-plugin'
import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin'

if (!process.env.APP_URL) {
  process.env.APP_URL = 'https://nutrition-site.ddev.site'
}

export default defineConfig({
  base: '/wp-content/themes/nutrition/public/build/',

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: {
      origin: 'https://nutrition-site.ddev.site',
    },
    hmr: {
      host: 'nutrition-site.ddev.site',
      protocol: 'wss',
      clientPort: 5173,
    },
  },

  plugins: [
    tailwindcss(),

    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/app.js',
        'resources/css/editor.css',
        'resources/js/editor.js',
      ],
      refresh: true,
      assets: [
        'resources/images/**',
        'resources/fonts/**',
      ],
    }),

    wordpressPlugin(),

    wordpressThemeJson({
      disableTailwindColors: false,
      disableTailwindFonts: false,
      disableTailwindFontSizes: false,
      disableTailwindBorderRadius: false,
    }),
  ],

  resolve: {
    alias: {
      '@scripts': '/resources/js',
      '@styles': '/resources/css',
      '@fonts': '/resources/fonts',
      '@images': '/resources/images',
    },
  },
})
