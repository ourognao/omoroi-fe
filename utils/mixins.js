import changeCase from 'change-case'
import queryString from 'query-string'
import moment from 'moment'
import constants from '~/utils/constants'

export default {
  computed: {
    $locale () {
      return this.$store.state.base.locale.selected
    }
  },
  methods: {
    getOrganizerInfos (organizerId) {
      let users = this.$store.state.users.index.users
      let organizer = users.filter(user => user.id === organizerId)
      if (!organizer) return
      return organizer[0]
    },
    scrollToTop (view) {
      let windowView = document.getElementsByClassName(view)[0]
      if (!windowView) return
      windowView.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    goToPage (path) {
      window.location.href = path
    },
    reduceLocationAddress (event) {
      let locale = this.$store.state.base.locale.selected
      let eventLocation = locale === 'ja' ? event.locationJp : event.locationEn
      return eventLocation.includes(',') ? eventLocation.split(',')[0] : eventLocation
    },
    getGoogleMapHref (event) {
      // let location = this.reduceLocationAddress(event).replace(/ /g, '')
      let eventLocationName = this.displayLocationName(event)
      return `https://maps.google.com/?q=${eventLocationName}`
    },
    openWaitingScreen (options) {
      return new Promise((resolve, reject) => {
        this.$store.commit('merge', ['base.waiting', {
          text: this.$t('base.waiting.text'),
          visible: true
        }])
        setTimeout(() => {
          if (typeof document !== 'undefined') {
            let dialogContent = document.getElementsByClassName('l-waiting')[0].parentElement
            dialogContent.style.zIndex = 1001
            if (!options.onDialog) {
              let overlays = document.getElementsByClassName('v-overlay')
              let overlay = overlays[overlays.length - 1]
              overlay.style.zIndex = 1000
            }
          }
        }, 0)
      })
    },
    closeWaitingScreen () {
      this.$store.commit('merge', ['base.waiting', {
        visible: false
      }])
    },
    setGmapMarker (positions) {
      this.gmap.markers[0].position.lat = this.gmap.center.lat = this.lat = parseFloat(positions[0])
      this.gmap.markers[0].position.lng = this.gmap.center.lng = this.lng = parseFloat(positions[1])
      // Vue.$gmapDefaultResizeBus.$emit('resize')
    },
    rangeOptionsForSelect (start, end, options) {
      let selectOptions = options.includeUnlimitedOption === true
        ? [{ text: this.$t('base.form.unlimited'), value: 0 }]
        : []
      for (let i = start; i <= end; i++) {
        const text = i === end ? i : i
        selectOptions.push({text: text, value: i})
      }
      return selectOptions
    },
    staffOptions (store) {
      let staffItems = []
      let users = store.state.users.index.users
      users.forEach(
        function (staff) {
          staffItems.push({ text: `${staff.name} (${staff.email})`, value: staff.id })
        }
      )
      return staffItems
    },
    costOptions (args) {
      let costItems = []
      for (var price = args.min; price <= args.max; price += args.step) {
        costItems.push({
          text: `${this.$t('base.common.yen')}${price}`,
          value: price
        })
      }
      return costItems
    },
    timeOptions () {
      let timeItems = []
      let timeTypes = ['00', '15', '30', '45']
      let timeOtherItem = {
        text: this.$t('base.form.select-anytime'),
        value: 'any'
      }
      for (var index = 0; index < 24; index++) {
        let prefix = index < 10 ? '0' : ''
        timeTypes.forEach(
          function (timeType) {
            let timeItem = {
              text: `${prefix}${index}:${timeType}`,
              value: `${prefix}${index}:${timeType}`
            }
            timeItems.push(timeItem)
          }
        )
      }
      timeItems.push(timeOtherItem)
      return timeItems
    },
    nl2br (object, type) {
      if (!object) return
      let locale = this.$store.state.base.locale.selected
      let text = null
      switch (type) {
        case 'location':
          text = locale === 'ja' ? object.locationJp : object.locationEn
          break
        case 'explanation':
          text = locale === 'ja' ? object.explanationJp : object.explanationEn
          break
      }
      return text.split('\n').join('<br/>')
    },
    formatDatetime (date, formatString = 'YYYY/MM/DD HH:mm') {
      return moment(date).format(formatString)
    },
    displayLocationName (event) {
      if (!event) return
      let locale = this.$store.state.base.locale.selected
      return locale === 'ja' ? event.eventLocationNameJp : event.eventLocationNameEn
    },
    displayEventTitle (currentSection, event, options) {
      if (!event) return
      let eventTitles = JSON.parse(event.title)
      let section = !currentSection ? event.section[0] : currentSection
      let index = eventTitles.findIndex(arr => arr.section === section)
      let title = null
      let titleItems = [
        { locale: 'ja', maxlength: 11, title: eventTitles[index].titleJp },
        { locale: 'en', maxlength: 26, title: eventTitles[index].titleEn }
      ]
      let titleItemsIndex = titleItems.filter(titleItem => titleItem.locale === this.$locale)[0]
      if (options.fromTopPage && titleItemsIndex.title.length > titleItemsIndex.maxlength) {
        title = titleItemsIndex.title.substr(0, titleItemsIndex.maxlength) + '...'
      } else {
        title = titleItemsIndex.title
      }
      return title
    },
    truncate (event, maxCharacters, type) {
      let locale = this.$store.state.base.locale.selected
      let text = null
      switch (type) {
        case 'location':
          text = locale === 'ja' ? event.locationJp : event.locationEn
          break
        case 'explanation':
          text = locale === 'ja' ? event.explanationJp : event.explanationEn
          break
      }
      return text.length > maxCharacters ? text.substr(0, maxCharacters) + '...' : text
    },
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
          if (!options.onDialog) {
            let overlays = document.getElementsByClassName('v-overlay')
            let overlay = overlays[overlays.length - 1]
            overlay.style.zIndex = 1000
          }
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
      if (!event.threshold && event.capacity === 0) return participants
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
      let formatted = locale === 'ja' ? 'YYYY年MM月DD (dd)' : 'ddd, MMM D, YYYY'
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
