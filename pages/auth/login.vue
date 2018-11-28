<template lang="pug">
#auth-login
  auth-login-main
  auth-login-dialog
</template>

<!-- ============================================================================ -->

<script>
import AuthLoginMain from '~/containers/auth/login/Main'
import AuthLoginDialog from '~/containers/auth/login/Dialog'

export default {
  components: {
    AuthLoginMain,
    AuthLoginDialog
  },
  head () {
    return {
      title: `${this.$t('base.head.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', {
      current: 'auth.login',
      fullPath: route.fullPath
    }])
    store.commit('merge', ['auth.login', {
      dialog: (query.dialog === 'true')
    }])
  }
}
</script>
