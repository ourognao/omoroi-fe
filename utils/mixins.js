import changeCase from 'change-case'
import queryString from 'query-string'
import moment from 'moment'
import constants from '~/utils/constants'

export default {
  methods: {
    reload () {
      this.$router.go(this.$router.currentRoute)
    },
    confirm (options) {
      return new Promise((resolve, reject) => {
        this.$store.commit('merge', ['base.confirm', {
          title: options.title || this.$t('base.confirm.title'),
          text: options.text,
          agreed () { resolve(true) },
          disagreed () { resolve(false) },
          visible: true
        }])
        setTimeout(() => {
          let dialogContent = document.getElementsByClassName('l-confirm')[0].parentElement
          dialogContent.style.zIndex = 1001
          let overlays = document.getElementsByClassName('overlay')
          let overlay = overlays[overlays.length - 1]
          overlay.style.zIndex = 1000
        }, 0)
      })
    },
    message (message) {
      this.$store.commit('merge', ['base.snackbar', {
        message: message,
        visible: true
      }])
    },
    auth (headers, data) {
      return {
        token: headers['access-token'],
        uid: headers.uid,
        client: headers.client,
        id: data.data.id,
        email: data.data.email,
        name: data.data.name,
        kind: data.data.kind
      }
    },
    defaultUrl (layer) {
      return constants.defaultUrl[layer][process.env.real]
    },
    getSelectOptionsFor (initialIndex, capacity, context = null) {
      let selectOptions = []
      let more = context ? context.$t('base.form.more') : ''
      for (let i = initialIndex; i <= capacity; i++) {
        let text = i === capacity ? i + more : i
        selectOptions.push({text: text, value: i})
      }
      return selectOptions
    },
    getUrlParams () {
      let url = this.$store.state.base.layout.fullPath
      let hashes = url.slice(url.indexOf('?') + 1).split('&')
      let params = {}
      hashes.map(hash => {
        let [key, val] = hash.split('=')
        params[key] = decodeURIComponent(val)
      })
      return params
    },
    setTime (event) {
      return event.endTime ? `${event.startTime}-${event.endTime}` : event.startTime
    },
    setAttending (event) {
      if (!event) return
      let remainingSpaces = this.setRemainingSpaces(event)
      let participants = event.capacity - remainingSpaces
      let format = this.setThreshold(event) === 'red-text'
        ? `${participants}/${event.capacity}`
        : `${participants}`
      return participants === event.capacity
        ? this.$t('top.index.events.list.info.i02')
        : format
    },
    setThreshold (event) {
      if (!event.threshold) return
      let remainingSpaces = this.setRemainingSpaces(event)
      let threshold = Math.round((event.capacity * event.threshold) / 100)
      return remainingSpaces <= threshold ? 'red-text' : ''
    },
    setRemainingSpaces (event) {
      let reducer = (accumulator, currentValue) => accumulator + currentValue
      let expectedPeoples = event.reservations.map(reservation => reservation.expectedPeople)
      return expectedPeoples.length > 0 ? (event.capacity - expectedPeoples.reduce(reducer)) : event.capacity
    },
    formatDate (date) {
      let locale = this.$store.state.base.locale.selected
      let formatted = locale === 'ja' ? 'YYYY年MM月DD (dd)' : 'ddd, MMMM D, YYYY'
      moment.locale(locale)
      return moment(date).format(formatted)
    },
    path (url) {
      let locale = this.$store.state.base.locale.selected
      return (locale === 'ja' ? url : '/' + locale + url)
    },
    push (store, key, path, hash) {
      store.commit('merge', [key, hash])

      let hash2 = {}
      for (let key in hash) {
        hash2[changeCase.snakeCase(key)] = hash[key]
      }
      let params = queryString.stringify(hash2)
      let localePath = store.state.base.locale.selected === 'en' ? `/en${path}` : path
      window.history.pushState(null, null, `${localePath}?${params}`)
      store.commit('merge', ['base.layout', {
        fullPath: `${localePath}?${params}`
      }])
    },
    goto (router, url) {
      let t = Date.now()
      url = url.indexOf('?') === -1 ? `${url}?t=${t}` : `${url}&t=${t}`
      router.push(this.path(url))
    }
  }
}
