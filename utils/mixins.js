import changeCase from 'change-case'
import queryString from 'query-string'
import moment from 'moment'
import constants from '~/utils/constants'

export default {
  methods: {
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
      let format = this.setThreshold(event) === 'red-text'
        ? `${event.remaining}/${event.capacity}`
        : `${event.remaining}`
      return event.remaining === event.capacity
        ? this.$t('top.events.list.info.i02')
        : format
    },
    setThreshold (event) {
      if (!event.threshold) return
      let threshold = Math.round((event.capacity * event.threshold) / 100)
      return event.remaining <= threshold ? 'red-text' : ''
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
    },
    fakeData (store, dialog, eventId) {
      store.commit('merge', ['top.index', {
        scroll: 0,
        dialog: dialog,
        eventId: parseInt(eventId),
        events: [
          {
            id: 1,
            picture: '/images/top/carousel/2.jpg',
            title: 'Language Exchange Party !!',
            location: 'Miyakojima Sports Center',
            date: '2017-07-03',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['futsal'],
            position: [34.7012792, 135.52809049999996],
            access: '5-8min walk from Noda. Tamagawa or Ebie Station',
            cost: 500,
            organizerId: 1,
            explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
          },
          {
            id: 2,
            picture: '/images/top/carousel/2.jpg',
            title: 'Language Exchange Party !!',
            location: 'Miyakojima Sports Center',
            date: '2017-02-16',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['volleyball'],
            position: [34.7012792, 135.52809049999996],
            access: '5-8min walk from Noda. Tamagawa or Ebie Station',
            cost: 500,
            organizerId: 3,
            explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
          },
          {
            id: 3,
            picture: '/images/top/carousel/2.jpg',
            title: 'Language Exchange Party !!',
            location: 'Miyakojima Sports Center',
            date: '2018-01-11',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['basketball'],
            position: [34.7012792, 135.52809049999996],
            access: '5-8min walk from Noda. Tamagawa or Ebie Station',
            cost: 500,
            organizerId: 4,
            explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
          },
          {
            id: 4,
            picture: '/images/top/carousel/2.jpg',
            title: 'Language Exchange Party !!',
            location: 'Miyakojima Sports Center',
            date: '2018-02-03',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['pingpong'],
            position: [34.7012792, 135.52809049999996],
            access: '5-8min walk from Noda. Tamagawa or Ebie Station',
            cost: 500,
            organizerId: 1,
            explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
          },
          {
            id: 5,
            picture: '/images/top/carousel/2.jpg',
            title: 'Language Exchange Party !!',
            location: 'Miyakojima Sports Center',
            date: '2018-03-17',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['badminton'],
            position: [34.7012792, 135.52809049999996],
            access: '5-8min walk from Noda. Tamagawa or Ebie Station',
            cost: 500,
            organizerId: 3,
            explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
          },
          {
            id: 6,
            picture: '/images/top/carousel/2.jpg',
            title: 'Football Tournamnent',
            location: 'Miyakojima Sports Center',
            date: '2018-04-26',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['futsal'],
            position: [34.7012792, 135.52809049999996],
            access: '5-8min walk from Noda. Tamagawa or Ebie Station',
            cost: 500,
            organizerId: 4,
            explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
          },
          {
            id: 7,
            picture: '/images/top/carousel/2.jpg',
            title: 'Language Exchange Party !!',
            location: 'Miyakojima Sports Center',
            date: '2018-05-24',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['other'],
            position: [34.7012792, 135.52809049999996],
            access: '5-8min walk from Noda. Tamagawa or Ebie Station',
            cost: 500,
            organizerId: 1,
            explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
          },
          {
            id: 8,
            picture: '/images/top/carousel/2.jpg',
            title: 'Language Exchange Party !!',
            location: 'Miyakojima Sports Center',
            date: '2018-07-20',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['kickboxing'],
            position: [34.7012792, 135.52809049999996],
            access: '5-8min walk from Noda. Tamagawa or Ebie Station',
            cost: 500,
            organizerId: 3,
            explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
          },
          {
            id: 9,
            picture: '/images/top/carousel/2.jpg',
            title: 'Language Exchange Party !!',
            location: 'Miyakojima Sports Center',
            date: '2018-09-10',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['volleyball'],
            position: [34.7012792, 135.52809049999996],
            access: '5-8min walk from Noda. Tamagawa or Ebie Station',
            cost: 500,
            organizerId: 4,
            explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
          },
          {
            id: 10,
            picture: '/images/top/carousel/2.jpg',
            title: 'Language Exchange Party !!',
            location: 'Miyakojima Sports Center',
            date: '2018-11-10',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['basketball'],
            position: [34.7012792, 135.52809049999996],
            access: '5-8min walk from Noda. Tamagawa or Ebie Station',
            cost: 500,
            organizerId: 1,
            explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
          },
          {
            id: 11,
            picture: '/images/top/carousel/2.jpg',
            title: 'Language Exchange Party !!',
            location: 'Miyakojima Sports Center',
            date: '2018-12-05',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['pingpong'],
            position: [34.7012792, 135.52809049999996],
            access: '5-8min walk from Noda. Tamagawa or Ebie Station',
            cost: 500,
            organizerId: 3,
            explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
          }
        ]
      }])
    }
  }
}
