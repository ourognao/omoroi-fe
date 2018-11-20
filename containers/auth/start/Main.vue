<template lang="pug">
v-container#auth-start-main(fluid)
  v-layout(justify-center align-center)
    v-flex(xs12 sm7 md4)
      v-layout
        v-flex(xs12)
          v-card
            v-card-title.grey.white--text
              span.f-fw2 {{ $t('auth.start.i01') }}

            v-card-text.f-px4.f-py3
              v-layout
                v-flex(xs12)
                  span {{ $t('auth.start.i02') }}
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
  computed: {
    $s () {
      return this.$store.state.auth.start
    }
  },
  async mounted () {
    this.signIn()
  },
  methods: {
    async signIn () {
      try {
        let { data, headers } = await axios.get(`${process.env.baseUrl}/auth/validate_token?locale=${this.$store.state.base.locale.selected}`, {
          headers: {
            'access-token': this.$s.token,
            client: this.$s.client,
            uid: this.$s.uid
          }
        })
        setToken(this.auth(headers, data), true)
        this.$store.commit('merge', ['base.auth', this.auth(headers, data)])
        window.location.href = '/'
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
