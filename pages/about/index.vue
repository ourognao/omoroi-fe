<template lang="pug">
#about-index
  about-index-main
  about-index-dialog
</template>

<!-- ============================================================================ -->

<script>
import AboutIndexMain from '~/containers/about/index/Main'
import AboutIndexDialog from '~/containers/about/index/Dialog'

export default {
  components: {
    AboutIndexMain,
    AboutIndexDialog
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
