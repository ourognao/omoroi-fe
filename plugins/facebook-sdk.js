import Vue from 'vue'

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
    console.log('setting fb sdk')
  }(document, 'script', 'facebook-jssdk'))

  window.fbAsyncInit = function onSDKInit () {
    window.FB.init(options)
    window.FB.getLoginStatus(function (response) {
      statusChangeCallback(response)
    })
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
  version: 'v3.2'
})

function statusChangeCallback (response) {
  console.log('statusChangeCallback')
  console.log(response)
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI()
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' + 'into this app.'
  }
}

function testAPI () {
  console.log('Welcome!  Fetching your information.... ')
  window.FB.api('/me', function (response) {
    console.log('Successful login for: ' + response.name)
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!'
  })
}
