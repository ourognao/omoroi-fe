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
            location: 'Yamabukicho Palace Building',
            date: '2018-04-19',
            startTime: '18:00',
            endTime: '21:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['futsal'],
            position: [35.70783649999999, 139.72920450000004],
            access: '7-min walk from Edogawa Station',
            cost: 500,
            organizerId: 4,
            explanation: 'Mauris a metus tincidunt, egestas metus eget, pretium lacus. Vestibulum iaculis lectus id dui pulvinar, vitae rhoncus nisl lacinia. Quisque ullamcorper, nisi et dapibus lobortis, nisi nisl iaculis massa, ut ultrices quam ipsum vel purus. Morbi consectetur at lorem sed ultrices. Vestibulum tempor viverra neque, vel sodales justo pellentesque quis. Proin sed mauris ut mi auctor porttitor. Nulla finibus massa id felis molestie mollis dapibus ac nisi. Quisque lorem tortor, convallis at dui mattis, aliquet gravida lectus. Sed venenatis at tortor in hendrerit. Ut nec tempor ante, id pretium erat. Praesent tristique eros quis ipsum mattis varius. Donec et orci id tellus eleifend tincidunt. Duis accumsan finibus libero non venenatis. Phasellus efficitur lorem nec arcu volutpat suscipit. Maecenas aliquet, risus suscipit vulputate semper, leo eros maximus libero, nec commodo nulla magna et est.'
          },
          {
            id: 7,
            picture: '/images/top/carousel/3.jpg',
            title: 'Badminton Tournamnent',
            location: 'Numabukuro Sport Center',
            date: '2018-04-21',
            startTime: '19:00',
            endTime: '22:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['badminton'],
            position: [35.7202667, 139.66310440000007],
            access: '2min walk from Shimoochiai Station',
            cost: 500,
            organizerId: 4,
            explanation: 'Donec ut nibh sit amet arcu rutrum sodales. Nullam feugiat erat at neque congue, eget condimentum nibh fringilla. Quisque vel laoreet lacus, eu lobortis turpis. Phasellus vel est ex. Maecenas pharetra lacus nec porttitor dignissim. Fusce facilisis viverra orci ac volutpat. Nulla facilisi. Integer quis sapien mollis, tempor orci quis, vehicula erat. Phasellus luctus urna quis scelerisque rutrum. Pellentesque tortor libero, placerat id scelerisque ut, elementum quis arcu.'
          },
          {
            id: 8,
            picture: '/images/top/carousel/4.jpg',
            title: 'Pingpong Tournamnent',
            location: 'Shimokitazaya Gymnastic center',
            date: '2018-04-22',
            startTime: '14:00',
            endTime: '16:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['pingpong'],
            position: [35.6615229, 139.66698199999996],
            access: '11-min walk from Shibya Station',
            cost: 500,
            organizerId: 4,
            explanation: 'Integer ut elementum felis. Suspendisse eget est neque. In molestie est eget diam interdum, eget sollicitudin diam tincidunt. Vivamus non ex luctus, tristique urna quis, suscipit lorem. Curabitur finibus feugiat turpis, id lobortis odio auctor sed. Etiam ac turpis at ipsum iaculis accumsan ut ac tellus. Aliquam lobortis turpis neque, hendrerit tincidunt metus commodo id. Nullam porttitor mi sem, non scelerisque augue scelerisque non. Praesent ut aliquet mauris, eget ultricies velit.'
          },
          {
            id: 9,
            picture: '/images/top/carousel/5.jpg',
            title: 'Kickboxing Tournamnent',
            location: 'Miyakojima Sports Center',
            date: '2018-04-26',
            startTime: '10:00',
            endTime: '20:30',
            remaining: 5,
            capacity: 30,
            threshold: 10,
            type: 'SC',
            tags: ['kickboxing'],
            position: [34.7012792, 135.52809049999996],
            access: '10min from Bago building',
            cost: 500,
            organizerId: 4,
            explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent odio velit, luctus at luctus et, feugiat quis leo. Phasellus ac iaculis dui. Morbi ligula tortor, ullamcorper eget venenatis id, mollis sit amet eros. Integer volutpat metus sed nibh pellentesque aliquet. Curabitur convallis arcu dolor, ac fermentum metus convallis a. In vitae est est. Aenean blandit purus auctor, fringilla mi nec, efficitur ante. Morbi nec nibh non elit faucibus mattis ac quis diam. Sed eu varius tortor. Phasellus consectetur pretium lacus et dapibus. Pellentesque non sem sodales justo volutpat commodo vitae sed ante.'
          },
          {
            id: 10,
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
            id: 11,
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
            id: 12,
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
            id: 13,
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
            id: 14,
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
