<template lang="pug">
v-container#auth-facebook-main(fluid)
  v-layout(justify-center align-center)
    v-flex(xs12 sm7 md4)
      v-card
        v-card-title.grey.white--text
          span.f-fw2 FACEBOOK LOGIN PAGE

        v-card-text.f-px4.f-py3
          v-layout(wrap)
            v-flex(xs12).text-xs-center
              p(id="connect")
                v-btn(flat @click.stop.prevent.native="launchFBFE")
                  span.f-mr1 Connect to FB! (launchFBFE)
                  v-icon check_circle
              p(id="results")
            v-flex(xs12).text-xs-center
              p(id="connect")
                v-btn(flat @click.stop.prevent.native="launchFBBE1")
                  span.f-mr1 Connect to FB! (launchFBBE1)
                  v-icon check_circle
              p(id="results")
            v-flex(xs12).text-xs-center
              p(id="connect")
                v-btn(flat @click.stop.prevent.native="launchFBBE2")
                  span.f-mr1 Connect to FB! (launchFBBE2)
                  v-icon check_circle
              p(id="results")
            v-flex(xs12).text-xs-center
              p(id="connect")
                v-btn(flat @click.stop.prevent.native="facebookSignUp")
                  span.f-mr1 Connect to FB!
                  v-icon check_circle
              p(id="results")
        v-divider

        v-card-actions
          v-spacer
          v-btn(flat @click.stop.prevent.native="signUp")
            span.f-mr1 {{ $t('auth.sign-up.i02') }}
            v-icon check_circle

      v-layout.f-mt2(wrap)
        v-flex(xs12)
          v-btn(flat nuxt :to="path('/auth/login')")
            v-icon arrow_back
            span.f-ml1 {{ $t('auth.sign-up.i04') }}
</template>

<!-- ============================================================================ -->

<style lang="stylus">
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import axios from '~/plugins/axios'
import queryString from 'query-string'

export default {
  mixins: [mixins],
  data () {
    return {
      mask: true,
      mask2: true,
      name: null,
      email: null,
      password: null,
      passwordConfirm: null
      // authWindow: Window,
      // code: null
    }
  },
  computed: {
    $facebookLoginDialog () {
      return this.$store.state.auth.facebook.dialog
    }
  },
  mounted () {
    console.log('IN FACEBOOK PAGE :: MOUNTED')
    if (this.getUrlParams().hasOwnProperty('code')) {
      console.log('IN FACEBOOK PAGE :: CODE RECEIVED')
      console.log(this.getUrlParams().code)
      this.getOmniAuthCallBack2(this.getUrlParams().code)
    } else {
      console.log('IN FACEBOOK PAGE :: CODE NOT RECEIVED')
      console.log()
    }
    // console.log('bacher', this.$facebookLoginDialog)
    // let facebookLoginDialog = window.open('', 'facebook-login-dialog', 'height=600,width=800')
    // facebookLoginDialog.document.body.innerHTML = this.$facebookLoginDialog
  },
  methods: {
    launchFBFE () {
      console.log('IN FACEBOOK PAGE :: Mounted')
      window.open(
        'https://www.facebook.com/v3.2/dialog/oauth?client_id=171853377070172&redirect_uri=https://omoroi-fe-staging.herokuapp.com/auth/facebook/callback'
      )
    },
    launchFBBE1 () {
      console.log('IN FACEBOOK PAGE :: Mounted')
      window.open(
        'https://www.facebook.com/v3.2/dialog/oauth?client_id=171853377070172&redirect_uri=https://omoroi-be-staging.herokuapp.com/auth/facebook/callback'
      )
    },
    launchFBBE2 () {
      console.log('IN FACEBOOK PAGE :: Mounted')
      window.open(
        'https://www.facebook.com/v3.2/dialog/oauth?client_id=171853377070172&redirect_uri=https://omoroi-be-staging.herokuapp.com/omniauth/facebook/callback'
      )
      // window.open(
      //   'https://www.facebook.com/v3.2/dialog/oauth?client_id=171853377070172&redirect_uri=https://omoroi-be-staging.herokuapp.com/auth/facebook/callback'
      // )
    },
    // launchFB () {
    //   console.log('the code', this.code)
    //   this.authWindow = window.open(`https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&code=${this.code}&client_id=171853377070172&display=popup&redirect_uri=https://omoroi-be-staging.herokuapp.com/auth/facebook/callback&scope=email`, '', 'width=600,height=400')
    // },
    facebookSignUp () {
      let context = this
      window.FB.login(function (response) {
        console.log(response)
        if (response.authResponse) {
          console.log('Connected! Hitting /auth/facebook/callback)...')
          context.getOmniAuthCallBack(response)
          // $('#connect').html('Connected! Hitting OmniAuth callback (GET /auth/facebook/callback)...')
          // since we have cookies enabled, this request will allow omniauth to parse
          // out the auth code from the signed request in the fbsr_XXX cookie
          // $.getJSON('/auth/facebook/callback', function (json) {
          //   $('#connect').html('Connected! Callback complete.')
          //   $('#results').html(JSON.stringify(json));
          // })
        }
      })
    },
    async getOmniAuthCallBack2 (code) {
      try {
        let params = queryString.stringify({
          code: code
        }, { arrayFormat: 'bracket' })
        console.log(params)
        let { data } = await axios.get(`/auth/facebook/callback`)
        // let { data } = await axios.get(`/auth/facebook/callback?code=${response.authResponse.signedRequest}`)
        // let { data } = await axios.get(`/auth/facebook/callback?resource_class=User`)
        console.log('getOmniAuthCallBack', data)
      } catch (error) {
        console.error(error)
      }
    },
    async getOmniAuthCallBack (response) {
      try {
        let params = queryString.stringify({
          code: response.authResponse.signedRequest
        }, { arrayFormat: 'bracket' })
        console.log('first', response.authResponse.signedRequest)
        this.code = response.authResponse.signedRequest
        document.cookie = `fbsr_171853377070172=${response.authResponse.signedRequest}`
        console.log('cookie', document.cookie)
        console.log('params', params)
        let { data } = await axios.get(`/auth/facebook/callback?code=${params}`)
        // let { data } = await axios.get(`/auth/facebook/callback?code=${response.authResponse.signedRequest}`)
        // let { data } = await axios.get(`/auth/facebook/callback?resource_class=User`)
        console.log('getOmniAuthCallBack', data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
