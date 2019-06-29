<template lang="pug">
#top-index
  div(v-if="$realEnv === 'production'")
    top-index-release
  div(v-else)
    top-index-main
    top-index-dialog
</template>

<!-- ============================================================================ -->

<script>
import TopIndexMain from '~/containers/top/index/Main'
import TopIndexDialog from '~/containers/top/index/Dialog'
import TopIndexRelease from '~/containers/top/index/Release'
import axios from '~/plugins/axios'
import queryString from 'query-string'
import moment from 'moment'
import mixins from '~/utils/mixins'

export default {
  mixins: [mixins],
  components: {
    TopIndexMain,
    TopIndexDialog,
    TopIndexRelease
  },
  head () {
    return {
      title: `${this.$t('base.head.title')}`
    }
  },
  mounted () {
    if (process.env.real !== 'production') {
      this.setLanguageBasedOnBrowser()
    }
  },
  methods: {
    setLanguageBasedOnBrowser () {
      let navigatorLanguage = window.navigator.language
      let preferredLanguage = JSON.parse(window.sessionStorage.getItem('preferred-language'))
      if (preferredLanguage && preferredLanguage[0].nl === navigatorLanguage) return
      window.sessionStorage.setItem(
        'preferred-language',
        JSON.stringify([{
          nl: navigatorLanguage,
          dl: navigatorLanguage === 'ja' ? 'ja' : 'en'
        }])
      )
      if (this.$store.state.base.layout.fullPath.substr(0, 3) === '/en' || navigatorLanguage === 'ja') return
      this.goto(this.$router, '/en')
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
      let { data } = await axios.get(`/events?${params}`, store.getters.options)
      store.commit('merge', ['top.index', {
        scroll: parseInt(query.scroll) || 0,
        dialog: (query.dialog === 'true'),
        eventId: parseInt(query.event_id) || 0,
        section: query.section,
        cmd: query.cmd,
        cmn: query.cmn,
        cgmad: query.cgmad,
        cgman: query.cgman,
        cgmbd: query.cgmbd,
        cgmbn: query.cgmbn,
        cgmcd: query.cgmcd,
        cgmcn: query.cgmcn,
        futurEvent: (query.futur_event === 'true'),
        events: data.data.events
      }])
      let currentMonth = {
        name: query.cmn,
        date: query.cmd
      }
      let currentMonths = [
        { name: query.cgman, date: query.cgmad },
        { name: query.cgmbn, date: query.cgmbd },
        { name: query.cgmcn, date: query.cgmcd }
      ]
      store.commit('merge', ['top.index', {
        currentMonth: currentMonth,
        currentMonths: currentMonths
      }])
      store.commit('merge', ['users.index', {
        users: data.data.staff
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
