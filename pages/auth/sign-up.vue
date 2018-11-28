<template lang="pug">
#auth-sign-up
  auth-sign-up-main
</template>

<!-- ============================================================================ -->

<script>
import AuthSignUpMain from '~/containers/auth/sign-up/Main'

export default {
  components: {
    AuthSignUpMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'auth.sign-up', fullPath: route.fullPath }])
  }
}
</script>
