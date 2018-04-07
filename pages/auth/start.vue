<template lang="pug">
#auth-start
  auth-start-main
</template>

<!-- ============================================================================ -->

<script>
import AuthStartMain from '~/containers/auth/start/Main'

export default {
  components: {
    AuthStartMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')} | ${this.$t('auth.start.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'auth.start', fullPath: route.fullPath }])

    store.commit('merge', ['auth.start', {
      token: query.token,
      client: query.client_id,
      uid: query.uid
    }])
  }
}
</script>
