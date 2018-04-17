<template lang="pug">
v-container#auth-sign-up-main(fluid)
  v-layout.p-layout(justify-center align-center)
    v-flex(xs12 sm7 md4)
      v-card
        v-card-title.grey.white--text
          span.f-fw2 {{ $t('auth.sign-up.i01') }}

        v-card-text.f-px4.f-py3
          v-layout(wrap)
            v-flex(xs12)
              v-text-field(
                type="text"
                v-model="name"
                name="user-name"
                :label="$t('attr.user-name')"
                prepend-icon="assignment_ind"
                v-validate="'required'"
                :error-messages="veeErrors.first('user-name') || []"
                @keypress.enter.native="signUp"
              )
            v-flex(xs12)
              v-text-field(
                type="email"
                v-model="email"
                name="user-email"
                :label="$t('attr.user-email')"
                prepend-icon="email"
                v-validate="'required|email'"
                :error-messages="veeErrors.first('user-email') || []"
                @keypress.enter.native="signUp"
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
                @keypress.enter.native="signUp"
              )
            v-flex(xs12)
              v-text-field(
                :type = "mask2 ? 'password' : 'text'"
                v-model="passwordConfirm"
                name="user-password-confirm"
                :label="$t('attr.user-password-confirm')"
                prepend-icon="vpn_key"
                v-validate="'required'"
                :error-messages="veeErrors.first('user-password-confirm') || []"
                :append-icon="mask2 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (mask2 = !mask2)"
                @keypress.enter.native="signUp"
              )

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
#auth-sign-up-main
  .p-layout
    height vmax()
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import axios from '~/plugins/axios'

export default {
  mixins: [mixins],
  data () {
    return {
      mask: true,
      mask2: true,
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    signUp (e) {
      this.veeErrors.clear()
      this.$validator.validateAll().then(async result => {
        if (!result) return
        try {
          await axios.post('/auth', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirm,
            confirm_success_url: `${window.location.origin}/auth/start`,
            locale: this.$store.state.base.locale.selected
          })
          this.message(this.$t('auth.sign-up.i03'))
          this.$router.push(this.path(`/auth/login`))
        } catch (error) {
          let names = {
            'user-name': 'user',
            'user-email': 'email',
            'user-password': 'password',
            'user-password-confirm': 'password_confirmation'
          }
          for (let key in names) {
            if (error.response.data.errors[names[key]]) {
              let attr = this.$t(`attr.${key}`)
              let message = error.response.data.errors[names[key]][0]
              let delim = this.$store.state.base.locale.selected === 'ja' ? '' : ' '
              this.veeErrors.add(key, `${attr}${delim}${message}`)
            }
          }
          console.error(error)
        }
      })
    }
  }
}
</script>