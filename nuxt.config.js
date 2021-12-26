export default {
    buildModules: [
        '@nuxt/postcss8',
        "@nuxtjs/svg",
    ],
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                'postcss-nested': {},
                'postcss-responsive-type': {},
                'postcss-hexrgba': {},
                autoprefixer: {},
            },
        },
    },
    css: [
        '@/assets/css/main.css',
    ],
}