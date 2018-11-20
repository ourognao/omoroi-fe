<template lang="pug">
v-container#auth-password-main(fluid)
  v-layout(justify-center align-center)
    v-flex(xs12 sm7 md4)
      v-card
        v-card-title.grey.white--text
          span.f-fw2 {{ $t('auth.password.i01') }}

        v-card-text.f-px4.f-py3
          v-layout(wrap)
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
                @click:append="() => (mask2 = !mask2)"
                @keypress.enter.native="signUp"
              )

        v-divider

        v-card-actions
          v-spacer
          v-btn(flat @click.stop.prevent.native="signUp")
            span.f-mr1 {{ $t('auth.password.i02') }}
            v-icon check_circle

      v-layout.f-mt2(wrap)
        v-flex(xs12)
          v-btn(flat nuxt :to="path('/auth/login')")
            v-icon arrow_back
            span.f-ml1 {{ $t('auth.password.i04') }}
</template>

<!-- ============================================================================ -->

<style lang="stylus">
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import axios from '~/plugins/axios'
import { setToken } from '~/utils/auth'

export default {
  mixins: [mixins],
  data () {
    return {
      mask: true,
      mask2: true,
      password: '',
      passwordConfirm: ''
    }
  },
  computed: {
    $s () {
      return this.$store.state.auth.password
    }
  },
  methods: {
    signUp (e) {
      this.veeErrors.clear()
      this.$validator.validateAll().then(async result => {
        if (!result) return
        try {
          let { data, headers } = await axios.put('/auth/password', {
            password: this.password,
            password_confirmation: this.passwordConfirm,
            locale: this.$store.state.base.locale.selected
          }, {
            headers: {
              'access-token': this.$s.token,
              client: this.$s.client,
              uid: this.$s.uid
            }
          })

          this.message(this.$t('auth.password.i03'))
          setToken(this.auth(headers, data), true)
          this.$store.commit('merge', ['base.auth', this.auth(headers, data)])
          window.location.href = '/'
        } catch (error) {
          let names = {
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
