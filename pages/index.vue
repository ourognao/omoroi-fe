<template lang="pug">
#top-index
  top-index-main
  top-index-dialog
</template>

<!-- ============================================================================ -->

<script>
import TopIndexMain from '~/containers/top/index/Main'
import TopIndexDialog from '~/containers/top/index/Dialog'

export default {
  components: {
    TopIndexMain,
    TopIndexDialog
  },
  head () {
    return {
      title: `${this.$t('base.head.title')} | ${this.$t('top.index.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'top.index', fullPath: route.fullPath }])
    store.commit('merge', ['top.index', {
      scroll: parseInt(query.scroll) || 0,
      dialog: (query.dialog === 'true')
    }])
    store.commit('merge', ['users.index', {
      users: [
        { id: 1, name: 'George', email: 'george@gmail.com', kind: 'admin', line: 'fishgutts' },
        { id: 2, name: 'Bago', email: 'bago@hotmail.fr', kind: 'engineer', line: 'bago25' },
        { id: 3, name: 'Maki', email: 'maki@hotmail.fr', kind: 'organizer', line: 'maki369' },
        { id: 4, name: 'Chikako', email: 'chikako@hotmail.fr', kind: 'organizer', line: 'chikako333' },
        { id: 5, name: 'Sakamoto', email: 'sakamoto@hotmail.fr', kind: 'staff', line: 'sakamoto98566' }
      ]
    }])
  }
}
</script>
