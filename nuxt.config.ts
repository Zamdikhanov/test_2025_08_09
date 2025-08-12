// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },

    app: {
        baseURL: "/test_2025_08_09/",
    },
    nitro: {
        preset: "github_pages",
    },
    image: {
        provider: "ipxStatic",
        dir: "public/images",
        // ipx: {
        // Опционально: если нужно переопределить dir для IPX
        // dir: "public",
        // Нет прямой опции baseURL для IPX, но app.baseURL применяется глобально
        // },
    },
    ssr: false,

    modules: [
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxt/image",
        "reka-ui/nuxt",
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/_mixin.scss" as *;',
                },
            },
        },
    },

    css: ["~/assets/styles/index.scss"],

    fonts: {
        defaults: {
            weights: [400, 500, 700],
            styles: ["normal"],
        },
        families: [{ name: "PTRootUI", provider: "local" }],
    },

    icon: {
        componentName: "AppIcon",
        provider: "none",
        clientBundle: {
            scan: true,
        },
        class: "app-icon",
        customCollections: [
            {
                prefix: "local-icon",
                dir: "./app/assets/icons",
            },
        ],
    },
});
