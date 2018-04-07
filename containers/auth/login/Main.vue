<template lang="pug">
v-container#auth-login-main(fluid)
  v-layout.p-layout(wrap justify-center align-center)
    v-flex(xs12 sm7 md4)
      v-card
        v-card-title.grey.white--text
          span.f-fw2 {{ $t('auth.login.i01') }}

        v-card-text.f-px4.f-py3
          v-layout(wrap)
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
                :append-icon-cb="() => (mask = !mask)"
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
        v-flex(xs12 sm6)
          v-btn(flat @click.stop.prevent.native="open")
            v-icon sentiment_very_dissatisfied
            span.f-ml1 {{ $t('auth.login.i04') }}

        v-flex.text-sm-right(xs12 sm6)
          v-btn(flat nuxt :to="path('/auth/sign-up')")
            v-icon person
            span.f-ml1 {{ $t('auth.login.i09') }}
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#auth-login-main
  .p-layout
    height vmax()
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
      rememberMe: true
    }
  },
  methods: {
    signIn (e) {
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
        } catch (error) {
          this.veeErrors.add('user-password', error.response.data.errors[0])
          console.error(error)
        }
        this.$router.replace(this.path('/'))
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
