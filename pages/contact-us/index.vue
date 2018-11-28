<template lang="pug">
#contact-us-index
  contact-us-index-main
  contact-us-index-dialog
</template>

<!-- ============================================================================ -->

<script>
import ContactUsIndexMain from '~/containers/contact-us/index/Main'
import ContactUsIndexDialog from '~/containers/contact-us/index/Dialog'

export default {
  components: {
    ContactUsIndexMain,
    ContactUsIndexDialog
  },
  head () {
    return {
      title: `${this.$t('base.head.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'contact-us.index', fullPath: route.fullPath }])
  }
}
</script>
