<template lang="pug">
#events-index
  events-index-main
  events-index-dialog
</template>

<!-- ============================================================================ -->

<script>
import EventsIndexMain from '~/containers/events/index/Main'
import EventsIndexDialog from '~/containers/events/index/Dialog'
import axios from '~/plugins/axios'
import queryString from 'query-string'
import moment from 'moment'

export default {
  middleware: 'authenticated',
  components: {
    EventsIndexMain,
    EventsIndexDialog
  },
  head () {
    return {
      title: `${this.$t('base.head.title')} | ${this.$t('events.index.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'events.index', fullPath: route.fullPath }])
    try {
      let params = queryString.stringify({
        bom: moment().subtract(1, 'months').format('YYYY-MM-DD'),
        eom: moment().add(1, 'months').format('YYYY-MM')
      }, { arrayFormat: 'bracket' })
      let { data } = await axios.get(`/events?${params}`, store.getters.options)
      store.commit('merge', ['events.index', {
        events: data.data.events,
        scroll: parseInt(query.scroll) || 0,
        eventId: parseInt(query.event_id) || 0,
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
