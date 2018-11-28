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

export default {
  middleware: 'authenticated',
  components: {
    EventsIndexMain,
    EventsIndexDialog
  },
  head () {
    return {
      title: `${this.$t('base.head.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'events.index', fullPath: route.fullPath }])
    try {
      let page = parseInt(query.page) || 1
      let params = queryString.stringify({
        page: page,
        direction: query.direction ? query.direction : null
      }, { arrayFormat: 'bracket' })
      let { data } = await axios.get(`/events?${params}`, store.getters.options)
      store.commit('merge', ['events.index', {
        events: data.data.events,
        scroll: parseInt(query.scroll) || 0,
        eventId: parseInt(query.event_id) || 0,
        page: page,
        totalPages: data.data.totalPages,
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
