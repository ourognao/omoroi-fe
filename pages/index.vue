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
          date: '2017-09-18',
          startTime: '18:00',
          endTime: '21:30',
          remaining: 5,
          capacity: 30,
          type: 'SC',
          tags: ['party']
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
          type: 'SC',
          tags: ['party']
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party !!',
          location: 'Miyakojima Sports Center',
          date: '2018-01-03',
          startTime: '18:00',
          endTime: '21:30',
          remaining: 5,
          capacity: 30,
          type: 'SC',
          tags: ['party']
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party !!',
          location: 'Miyakojima Sports Center',
          date: '2018-01-10',
          startTime: '18:00',
          endTime: '21:30',
          remaining: 5,
          capacity: 30,
          type: 'SC',
          tags: ['party']
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party !!',
          location: 'Miyakojima Sports Center',
          date: '2018-02-16',
          startTime: '18:00',
          endTime: '21:30',
          remaining: 5,
          capacity: 30,
          type: 'SC',
          tags: ['party']
        },
        {
          picture: '/images/tmp/soccer.jpg',
          title: 'Soccer Game For Everyone',
          location: 'Roppongi',
          date: '2018-05-20',
          startTime: '12:00',
          endTime: null,
          remaining: 6,
          capacity: 11,
          type: 'SP',
          tags: ['soccer']
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-02-27',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          type: 'LX',
          tags: ['basketball']
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-02-27',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          type: 'LX',
          tags: ['basketball']
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-02-27',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          type: 'LX',
          tags: ['basketball']
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-02-27',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          type: 'LX',
          tags: ['basketball']
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-02-27',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          type: 'LX',
          tags: ['basketball']
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-02-27',
          startTime: '11:00',
          endTime: '20:30',
          remaining: 2,
          capacity: 8,
          type: 'LX',
          tags: ['basketball']
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-03-27',
          startTime: '08:00',
          endTime: '11:30',
          remaining: 2,
          capacity: 8,
          type: 'LX',
          tags: ['basketball']
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-03-27',
          startTime: '16:00',
          endTime: null,
          remaining: 2,
          capacity: 8,
          type: 'SP',
          tags: ['basketball']
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-04-27',
          startTime: '14:00',
          endTime: null,
          remaining: 2,
          capacity: 8,
          type: 'SC',
          tags: ['basketball']
        },
        {
          picture: '/images/tmp/basketball.jpg',
          title: 'Basketball Tournament',
          location: 'Ebisu',
          date: '2018-05-27',
          startTime: '10:00',
          endTime: null,
          remaining: 2,
          capacity: 8,
          type: 'LX',
          tags: ['basketball']
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party !!',
          location: 'Shibuya',
          date: '2019-02-16',
          startTime: '05:00',
          endTime: null,
          remaining: 5,
          capacity: 30,
          type: 'SC',
          tags: ['party']
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party 2 !!',
          location: 'Shibuya',
          date: '2019-05-16',
          startTime: '18:00',
          endTime: null,
          remaining: 5,
          capacity: 30,
          type: 'SC',
          tags: ['party']
        },
        {
          picture: '/images/tmp/party.jpg',
          title: 'Language Exchange Party 3!!',
          location: 'Shibuya',
          date: '2019-05-22',
          startTime: '21:00',
          endTime: null,
          remaining: 5,
          capacity: 30,
          type: 'SC',
          tags: ['party']
        }
      ]
    }])
  }
}
</script>
