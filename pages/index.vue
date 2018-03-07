<template lang="pug">
#top-index
  top-index-main
</template>

<!-- ============================================================================ -->

<script>
import TopIndexMain from '~/containers/top/index/Main'

export default {
  components: {
    TopIndexMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')} | ${this.$t('top.index.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'top.index', fullPath: route.fullPath }])
    store.commit('merge', ['events.index', {
      events: [
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party !!',
          location: 'Miyakojima Sports Center',
          date: '2017-06-12',
          startTime: '18:00',
          endTime: '21:30',
          remaining: 5,
          capacity: 30,
          threshold: 20,
          type: 'SC',
          tags: ['other'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
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
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party !!',
          location: 'Miyakojima Sports Center',
          date: '2017-08-05',
          startTime: '18:00',
          endTime: '21:30',
          remaining: 5,
          capacity: 30,
          threshold: 40,
          type: 'SC',
          tags: ['badminton'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party !!',
          location: 'Miyakojima Sports Center',
          date: '2017-09-18',
          startTime: '18:00',
          endTime: '21:30',
          remaining: 5,
          capacity: 30,
          threshold: 5,
          type: 'SC',
          tags: ['badminton'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party !!',
          location: 'Miyakojima Sports Center',
          date: '2017-02-08',
          startTime: '18:00',
          endTime: '21:30',
          remaining: 5,
          capacity: 30,
          threshold: 10,
          type: 'SC',
          tags: ['volleyball'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party !!',
          location: 'Miyakojima Sports Center',
          date: '2018-02-03',
          startTime: '18:00',
          endTime: '21:30',
          remaining: 5,
          capacity: 30,
          threshold: 10,
          type: 'SC',
          tags: ['kickboxing'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party !!',
          location: 'Miyakojima Sports Center',
          date: '2018-02-10',
          startTime: '18:00',
          endTime: '21:30',
          remaining: 5,
          capacity: 30,
          threshold: 10,
          type: 'SC',
          tags: ['pingpong'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Volleyball event',
          location: 'Miyakojima Sports Center',
          date: '2018-03-16',
          startTime: '18:00',
          endTime: '21:30',
          remaining: 5,
          capacity: 30,
          threshold: 15,
          type: 'SC',
          tags: ['volleyball'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/soccer.jpg',
          title: 'Kickboxing events',
          location: 'Roppongi',
          date: '2018-03-20',
          startTime: '12:00',
          endTime: null,
          remaining: 6,
          capacity: 11,
          threshold: 5,
          type: 'SP',
          tags: ['kickboxing'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-03-18',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          threshold: null,
          type: 'LX',
          tags: ['basketball'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Other Sport Event',
          location: 'Ebisu',
          date: '2018-03-20',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          threshold: null,
          type: 'LX',
          tags: ['other'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Ping Pong Tournament',
          location: 'Ebisu',
          date: '2018-03-22',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          threshold: null,
          type: 'LX',
          tags: ['pingpong'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Badminton Tournament',
          location: 'Ebisu',
          date: '2018-04-24',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          threshold: null,
          type: 'LX',
          tags: ['badminton'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-04-27',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          threshold: null,
          type: 'LX',
          tags: ['basketball'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-05-27',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          threshold: null,
          type: 'LX',
          tags: ['basketball'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Futsal Tournament',
          location: 'Ebisu',
          date: '2018-05-26',
          startTime: '08:00',
          endTime: '11:30',
          remaining: 2,
          capacity: 8,
          threshold: 10,
          type: 'LX',
          tags: ['futsal', 'friends'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Kickboxing Tournament',
          location: 'Ebisu',
          date: '2018-05-27',
          startTime: '16:00',
          endTime: null,
          remaining: 2,
          capacity: 8,
          threshold: 20,
          type: 'SP',
          tags: ['kickboxing'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-06-28',
          startTime: '16:00',
          endTime: null,
          remaining: 2,
          capacity: 8,
          threshold: 5,
          type: 'SP',
          tags: ['basketball'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Pingpong Tournament',
          location: 'Ebisu',
          date: '2018-07-25',
          startTime: '14:00',
          endTime: null,
          remaining: 2,
          capacity: 8,
          threshold: 10,
          type: 'SC',
          tags: ['pingpong'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-08-27',
          startTime: '14:00',
          endTime: null,
          remaining: 2,
          capacity: 8,
          threshold: 10,
          type: 'SC',
          tags: ['basketball'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-09-27',
          startTime: '10:00',
          endTime: null,
          remaining: 2,
          capacity: 8,
          threshold: 10,
          type: 'LX',
          tags: ['basketball'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party !!',
          location: 'Shibuya',
          date: '2018-10-16',
          startTime: '05:00',
          endTime: null,
          remaining: 5,
          capacity: 30,
          threshold: 10,
          type: 'SC',
          tags: ['badminton'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party 2 !!',
          location: 'Shibuya',
          date: '2018-11-16',
          startTime: '18:00',
          endTime: null,
          remaining: 5,
          capacity: 30,
          threshold: 10,
          type: 'SC',
          tags: ['badminton'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party 3!!',
          location: 'Shibuya',
          date: '2018-12-22',
          startTime: '21:00',
          endTime: null,
          remaining: 5,
          capacity: 30,
          threshold: 10,
          type: 'SC',
          tags: ['kickboxing'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party 3!!',
          location: 'Shibuya',
          date: '2019-01-27',
          startTime: '21:00',
          endTime: null,
          remaining: 5,
          capacity: 30,
          threshold: 10,
          type: 'SC',
          tags: ['volleyball'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party 3!!',
          location: 'Shibuya',
          date: '2019-02-27',
          startTime: '21:00',
          endTime: null,
          remaining: 5,
          capacity: 30,
          threshold: 10,
          type: 'SC',
          tags: ['futsal'],
          explanation: 'Learn Swift Tokyo is a weekly meetup for people interested in learning Swift and Xcode for iOS Development. All experience levels are welcome. '
        }
      ]
    }])
  }
}
</script>
