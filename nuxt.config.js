const { join } = require('path')
const webpack  = require('webpack')
const sites = [
  {
    hreflang: 'x-default',
    href: 'https://www.omoroi-life.com/',
    language: 'ja',
    title: '友達が欲しい！英語力アップ！ 国際交流の目的は人それぞれ… Omoroiイベントでおもろい時間を♪'
  },
  {
    hreflang: 'en-us',
    href: 'https://www.omoroi-life.com/en',
    language: 'en',
    title: 'Hangout with locals, meet new friends, explore cool places. Enjoy life!'
  }
]
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'https://www.omoroi-life.com',
    gzip: true,
    exclude: [
      '/contact-us/**',
      '/admin/**'
    ],
    routes: [
      {
        url: '/top',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: (new Date()).toISOString()
      },
      {
        url: '/auth/login',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: (new Date()).toISOString()
      },
      {
        url: '/auth/sign-up',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: (new Date()).toISOString()
      },
      {
        url: '/about',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: (new Date()).toISOString()
      },
      {
        url: '/privacy-policy',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: (new Date()).toISOString()
      },
      {
        url: '/terms-of-service',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: (new Date()).toISOString()
      },
      {
        url: '/auth/password',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: (new Date()).toISOString()
      },
      {
        url: '/events',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: (new Date()).toISOString()
      }
    ]
  },
  googleAnalytics: {
    id: 'UA-143366169-1'
  },
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
    { src: '~plugins/facebook-sdk', ssr: false },
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
    title: 'Omoroi | Osaka International - Social - Language - Sport - Party',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Hangout with locals, meet new friends, explore cool places. Enjoy life!'
      },
      {
        name: 'keywords',
        content: 'osaka kobe kyoto kyouto nara tokyo umeda shinsaibashi nanba namba tenma japan international parties sports sports in osaka futsal basketball badminton volleyball drinking parties japan japanese japanese language events international events osaka events osaka parties omoroi omoroilife omoroi life language exchange soccer football events in osaka local local osaka all you can drink all-you-can-drink party beer craftbeer craft beer wine nomihoudai parties in osaka パーティー インタナショナル インタナショナル パーティー イベント 大阪 東京 神戸 奈良 堺 京都 スポーツ 大阪スポーツ 大阪イベント バスケ バスケットボール バレー バレーボール 難波 心斎橋 梅田 天満 バドミントン フットサル サッカー 飲み会 立ち飲み屋 立ち飲み 立呑み バー ビール クラフトビール 地ビール ワイン 穴場 飲み会 外国人 英語 英会話 友達 女子会 おもろい オモロイ 飲み放題'
      }
    ].concat((function () {
      let alternates = []
      sites.forEach((site) => {
        alternates.push({
          hid: `alternate-${site.language}`,
          rel: 'alternate',
          hreflang: site.hreflang,
          href: site.href,
          title: site.title
        })
      })
      return alternates
    })()),
    link: [
      { rel: 'icon', type: 'image/png', href: '/images/logo/favicon-16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/images/logo/favicon-32.png', sizes: '32x32' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/notosansjapanese.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  loading: { color: '#FFFFFF' }
}
