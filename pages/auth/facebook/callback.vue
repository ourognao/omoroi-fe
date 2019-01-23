<template lang="pug">
#auth-facebook-callback
  auth-facebook-callback-main
</template>

<!-- ============================================================================ -->

<script>
import AuthFacebookCallbackMain from '~/containers/auth/facebook/callback/Main'

export default {
  components: {
    AuthFacebookCallbackMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'auth.facebook.callback', fullPath: route.fullPath }])
  }
}
</script>
