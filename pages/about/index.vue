<template lang="pug">
#about-index
  about-index-main
</template>

<!-- ============================================================================ -->

<script>
import AboutIndexMain from '~/containers/about/index/Main'

export default {
  components: {
    AboutIndexMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'about.index', fullPath: route.fullPath }])
  }
}
</script>
