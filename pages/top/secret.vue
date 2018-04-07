<template lang="pug">
#top-secret
  top-secret-main
</template>

<!-- ============================================================================ -->

<script>
import TopSecretMain from '~/containers/top/secret/Main'

export default {
  middleware: 'authenticated',
  components: {
    TopSecretMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')} | ${this.$t('top.secret.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'top.secret', fullPath: route.fullPath }])
  }
}
</script>
