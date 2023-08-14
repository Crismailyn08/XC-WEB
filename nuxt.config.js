require("dotenv").config();

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/tailwind.css",
    "vue-loading-overlay/dist/vue-loading.css",
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/vue-loading-overlay.js"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "vue-sweetalert2/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    [
      "nuxt-mq",
      {
        // Default breakpoint for SSR
        defaultBreakpoint: "default",
        breakpoints: {
          sm: 780,
          md: 1024,
          lg: Infinity,
        },
      },
    ],
    [
      "nuxt-validate",
      {
        lang: "es",
      },
    ],
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: "http://192.168.100.181:7001/api",
    browserBaseURL: "http://192.168.100.181:7001/api",
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        tailwindcss: "./tailwind.config.js",
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  server: {
    host: "0.0.0.0",
    port: 9000,
  },
};
