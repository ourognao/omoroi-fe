const { join } = require('path')
const webpack = require('webpack')
module.exports = {
  build: {
    vendor: [
      'vuetify',
      'vue-i18n',
      'vue-social-sharing'
    ],
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          stylus: {
            import: ['~assets/css/func']
          }
        }
      })
    ]
  },
  router: {
    middleware: [
      'i18n',
      'vee-validate'
    ]
  },
  plugins: [
    '~plugins/gmap',
    '~plugins/vuetify',
    '~plugins/vee-validate',
    '~plugins/social-sharing',
    '~plugins/i18n'
  ],
  env: {
    baseUrl: process.env.BASE_URL || 'http://127.0.0.1:4000',
    real: process.env.REAL_ENV || 'development'
  },
  css: [
    { src: join(__dirname, 'assets/css/app.styl'), lang: 'styl' }
  ],
  head: {
    title: 'Omoroi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Omoroi (おもろい)' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/images/favicon-16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/images/favicon-32.png', sizes: '32x32' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/notosansjapanese.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  loading: { color: '#3B8070' }
}
