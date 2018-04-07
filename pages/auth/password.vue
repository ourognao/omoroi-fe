<template lang="pug">
#auth-password
  auth-password-main
</template>

<!-- ============================================================================ -->

<script>
import AuthPasswordMain from '~/containers/auth/password/Main'

export default {
  components: {
    AuthPasswordMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')} | ${this.$t('auth.password.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'auth.password', fullPath: route.fullPath }])

    store.commit('merge', ['auth.password', {
      token: query.token,
      client: query.client_id,
      uid: query.uid
    }])
  }
}
</script>
