<template lang="pug">
#privacy-policy-index
  privacy-policy-index-main
</template>

<!-- ============================================================================ -->

<script>
import PrivacyPolicyIndexMain from '~/containers/privacy-policy/index/Main'

export default {
  components: {
    PrivacyPolicyIndexMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'privacy-policy.index', fullPath: route.fullPath }])
  }
}
</script>
