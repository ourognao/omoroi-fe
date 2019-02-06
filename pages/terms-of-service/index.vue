<template lang="pug">
#terms-of-service-index
  terms-of-service-index-main
</template>

<!-- ============================================================================ -->

<script>
import TermsOfServiceIndexMain from '~/containers/terms-of-service/index/Main'

export default {
  components: {
    TermsOfServiceIndexMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'terms-of-service.index', fullPath: route.fullPath }])
  }
}
</script>
