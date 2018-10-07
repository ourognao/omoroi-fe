<template lang="pug">
#top-index
  top-index-main
  top-index-dialog
</template>

<!-- ============================================================================ -->

<script>
import TopIndexMain from '~/containers/top/index/Main'
import TopIndexDialog from '~/containers/top/index/Dialog'
import axios from '~/plugins/axios'
import queryString from 'query-string'
import moment from 'moment'

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
    try {
      let params = queryString.stringify({
        screen: 'top',
        bom: moment().format('YYYY-MM-DD'),
        eom: moment().add(2, 'months').format('YYYY-MM')
      }, { arrayFormat: 'bracket' })
      console.log(store.getters.options)
      let { data } = await axios.get(`/events?${params}`, store.getters.options)
      store.commit('merge', ['top.index', {
        events: data.data.events,
        scroll: parseInt(query.scroll) || 0,
        eventId: parseInt(query.event_id) || 0,
        section: query.section,
        futurEvent: (query.futur_event === 'true'),
        dialog: (query.dialog === 'true')
      }])
      store.commit('merge', ['users.index', {
        users: data.data.users
      }])
    } catch (error) {
      if (error.message === 'Request failed with status code 401') {
        redirect('/auth/login')
      }
      console.error(error.message)
    }
  }
}
</script>
