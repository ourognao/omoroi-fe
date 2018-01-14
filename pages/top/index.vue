<template lang="pug">
#top-index
  top-index-main
</template>

<!-- ============================================================================ -->

<script>
import TopIndexMain from '~/containers/top/index/Main'

export default {
  components: {
    TopIndexMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')} | ${this.$t('top.index.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'top.index', fullPath: route.fullPath }])
  }
}
</script>
