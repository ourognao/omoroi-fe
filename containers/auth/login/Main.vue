<template lang="pug">
v-container#auth-login-main(fluid)
  v-layout(wrap justify-center align-center)
    v-flex(xs12 sm7 md4)
      v-card
        v-card-title.grey.white--text
          span.f-fw2 {{ $t('auth.login.i01') }}

        v-card-text.f-px4.f-py3
          v-layout(wrap)
            v-flex(xs12).text-xs-center
              img.pointable(
                @click="connectToFacebookSDK()"
                src="/images/sign-up/facebook-login-button.png").facebook-login-button
              div.mt-2.red-text.caption(v-if="providerErrorMessage").red-text {{ providerErrorMessage }}
            v-flex(xs12).mt-3.pt-3.text-xs-center.border-section-grey-top {{ $t('auth.login.i10') }}
            v-flex(xs12)
              v-text-field(
                type="email"
                v-model="email"
                name="user-email"
                :label="$t('attr.user-email')"
                prepend-icon="email"
                v-validate="'required|email'"
                :error-messages="veeErrors.first('user-email') || []"
                @keypress.enter.native="signIn"
              )
            v-flex(xs12)
              v-text-field(
                :type = "mask ? 'password' : 'text'"
                v-model="password"
                name="user-password"
                :label="$t('attr.user-password')"
                prepend-icon="vpn_key"
                v-validate="'required'"
                :error-messages="veeErrors.first('user-password') || []"
                :append-icon="mask ? 'visibility' : 'visibility_off'"
                @click:append="() => (mask = !mask)"
                @keypress.enter.native="signIn"
              )
            v-flex(xs12)
              v-checkbox(
                :label="$t('auth.login.i03')"
                color="primary"
                v-model="rememberMe"
                hide-details
              )

        v-divider

        v-card-actions
          v-spacer
          v-btn(flat @click.stop.prevent.native="signIn")
            span.f-mr1 {{ $t('auth.login.i01') }}
            v-icon input

      v-layout.f-mt2(wrap)
        v-flex(xs12).text-xs-center
          a(href="#" @click="open()").blue-text {{ $t('auth.login.i04') }}
        v-flex(xs12).mt-3.text-xs-center
          span {{ $t('auth.login.i11') }}
          nuxt-link(:to="path(redirectWithLocale('/auth/sign-up'))").blue-text  {{ $t('auth.sign-up.i01') }}.
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#auth-login-main
  .border-section-grey-top
    border-top 2px solid #bdbdbd
  .facebook-login-button
    width: 100%
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import { setToken } from '~/utils/auth'
import axios from '~/plugins/axios'

export default {
  mixins: [mixins],
  data () {
    return {
      mask: true,
      email: '',
      password: '',
      rememberMe: true,
      providerErrorMessage: null,
      session: this.getUrlParams().session
    }
  },
  mounted () {
    if (this.session === 'expired') {
      this.message(this.$t('base.session.expired'))
    }
  },
  methods: {
    signIn (e) {
      this.veeErrors.clear()
      this.providerErrorMessage = null
      this.$validator.validateAll().then(async result => {
        if (!result) return
        try {
          let { data, headers } = await axios.post('/auth/sign_in', {
            email: this.email,
            password: this.password,
            locale: this.$store.state.base.locale.selected
          })
          setToken(this.auth(headers, data), this.rememberMe)
          this.$store.commit('merge', ['base.auth', this.auth(headers, data)])
          window.location.href = this.redirectWithLocale('/')
        } catch (error) {
          this.$validator.errors.add({
            field: 'user-password',
            msg: error.response.data.errors[0]
          })
          console.error(error)
        }
      })
    },
    open (e) {
      this.push(this.$store, 'auth.login', '/auth/login', {
        dialog: true
      })
    }
  }
}
</script>
