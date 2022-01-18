export default {
    ssr: false,
    buildModules: [
        '@nuxt/postcss8',
        "@nuxtjs/svg",
    ],
    modules: ['@nuxtjs/axios'],
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