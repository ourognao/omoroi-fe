import Vue from 'vue'

export default ({ app, store }) => {
  const vueFb = {}
  vueFb.install = function install (Vue, options) {
    (function (d, s, id) {
      var js = d.getElementsByTagName(s)[0]
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = function onSDKInit () {
      window.FB.init(options)
      window.FB.getLoginStatus(function (response) {
        statusChangeCallback(response, store)
      })
      console.log('FB :: init')
      window.FB.AppEvents.logPageView()
      Vue.FB = window.FB
      window.dispatchEvent(new Event('fb-sdk-ready'))
    }
    Vue.FB = undefined
  }

  Vue.use(vueFb, {
    appId: '171853377070172',
    cookie: true,
    xfbml: true,
    version: 'v3.1'
  })

  function statusChangeCallback (response, store) {
    if (response.status !== 'connected') {
      store.commit('merge', ['base.auth', { uprovider: null }])
    }
  }
}
