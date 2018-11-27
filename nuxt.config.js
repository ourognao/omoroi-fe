const { join } = require('path')
const webpack = require('webpack')
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  build: {
    extend (config, ctx) {
      config.node = { fs: 'empty' }
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
      'vee-validate',
      'check-auth'
    ]
  },
  plugins: [
    '~plugins/vuetify',
    '~plugins/vee-validate',
    '~plugins/social-sharing',
    '~plugins/i18n',
    { src: '~plugins/v-uploader', ssr: false },
    { src: '~plugins/gmap', ssr: false },
    { src: '~plugins/viewer', ssr: false }
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
  loading: { color: '#FFFFFF' }
}
