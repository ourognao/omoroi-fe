<template lang="pug">
v-dialog(v-model="visible" scrollable persistent width="100%")
  v-card#top-index-dialog
    v-card-title.pa-0.grey.lighten-5
      span.ml-2 {{ $t('top.dialog.title')}}
      v-spacer
      v-btn(small icon flat @click.stop.prevent.native="cancel")
        v-icon close
    
    v-divider
    
    v-card-text.top-event-view
      v-container.pa-0(fluid class="event" v-if="event")
        v-layout(row class="border-blue-bottom")
          v-flex.caption(xs6)
            span(v-if="!firstEventIds.includes($s.eventId)")
              v-icon.mb-1(class="icon-blue icons events") navigate_before
              a(href="#" @click.stop.prevent="navigate('before')")
                | {{ $t('top.dialog.common.previous') }}
          v-flex.caption(xs6 class="text-xs-right")
            span(v-if="!lastEventIds.includes($s.eventId)")
              a(href="#" @click.stop.prevent="navigate('next')")
                | {{ $t('top.dialog.common.previous') }}
              v-icon.mb-1(class="icon-blue icons events") navigate_next
         
        v-layout(row class="main-image")
         v-flex.mt-2(xs12)
           img(:src="event.picture")

        v-layout(row class="border-blue-bottom")
          v-flex.caption(xs6)
            v-icon.mb-1(class="icon-blue icons events") panorama_fish_eye
            span {{ displayEventTitle($s.section, event) }}
          v-flex.caption(xs6 class="text-xs-right")
            v-flex.attending(xs12)
              v-icon people_outline
              span.ml-1 {{ setThreshold(event) === 'red-text' ? $t('top.index.events.list.info.i01') : $t('top.index.events.list.info.i03') }}
              span.ml-1(:class="setThreshold(event)") {{ setAttending(event) }}
        v-layout.mt-2(row)
          v-flex(xs6 class="date-location")
            v-layout(row)
              v-flex(xs12)
                v-icon event
                span {{ formatDate(event.date) }}
            v-layout(row)
              v-flex(xs12)
                v-icon access_time
                span {{ setTime(event) }}
            v-layout(row)
              v-flex(xs12)
                v-icon location_on
                span {{ event.location }}
          v-flex(xs6 class="gmap-section")
            gmap-map(
              :center="gmap['center']"
              :zoom="gmap['zoom']"
              :options="gmap['options']"
              style="height: 100px")
              gmap-marker(
                v-for="(marker, index) in gmap['markers']"
                :key="index"
                :icon="gmap['icon']"
                :position="marker.position")
        
        v-layout(row class="border-blue-bottom")
          v-flex.caption(xs12)
            v-icon.mb-1(class="icon-blue icons events") panorama_fish_eye
            span {{ $t('top.dialog.details.title') }}
        div(class="details")
          v-layout.mt-2(row)
            v-flex(xs12 v-html="event.explanation")
          v-layout.mt-2(row)
            v-flex(xs12)
              span.bold.underline.mr-1 {{ $t('top.dialog.details.i01') }}
              span {{ event.access }}
          v-layout.mt-2(row)
            v-flex(xs12)
              span.bold.underline.mr-1 {{ $t('top.dialog.details.i02') }}
              span {{ event.cost }}
          v-layout.mt-2(row)
            v-flex(xs12)
              span.bold.underline.mr-1 {{ $t('top.dialog.details.i03') }}
              span {{ getOrganizerInfos(event.userId).name }}
              span.ml-1 {{ $t('top.dialog.details.i04') }}:
              span {{ getOrganizerInfos(event.userId).line }}
              

        v-layout.mt-2(row class="border-blue-bottom" v-if="$s.futurEvent")
          v-flex.caption(xs12)
            v-icon.mb-1(class="icon-blue icons events") panorama_fish_eye
            span {{ $t('top.dialog.reservation.title') }}
        div(class="reservation" v-if="$s.futurEvent && $currentUser.id")
          v-layout(row)
            v-flex(xs6)
              v-text-field(
                type="text"
                v-model="name"
                prepend-icon="assignment_ind"
                :readonly="true"
                hide-details
              )
            v-flex(xs6)
              div(class="sns")
                v-layout(row)
                  v-flex.ml-2.mt-3(xs4)
                    span {{ $t('top.dialog.common.share') }}:
                  v-flex.mt-2(xs8)
                    social-sharing(
                      :url="$fullPath"
                      :title="event.title"
                      :description="event.explanation"
                      :quote="event.title"
                      :hashtags="hashtags"
                      twitter-user="lifeomoroi"
                      inline-template
                    )
                      div
                        network(network="facebook")
                          img.pointable(src="/images/sns/facebook.png" class="border-grey mt-1")
                        network(network="twitter")
                          img.pointable(src="/images/sns/twitter.png" class="border-grey mt-1")
          v-layout(row)
            v-flex(xs12)
              v-text-field(
                type="text"
                v-model="email"
                prepend-icon="email"
                :readonly="true"
                hide-details
              )
          v-layout(row)
            v-flex(xs6)
              v-select(
                v-bind:items="expectedPeopleItems"
                v-model="expectedPeople"
                :placeholder="$t('attr.reservation-total-guests')"
                :error-messages="veeErrors.first('reservation-total-guests') || []"
                v-validate="'required'"
                data-vv-name="reservation-total-guests"
                prepend-icon="people_outline"
              )
            v-flex.text-xs-right(xs6)
              v-btn.primary.mt-3(small @click.stop.prevent.native="send()")
                span {{ hasAlreadyReserved ? $t('top.dialog.reservation.button.i03') : $t('top.dialog.reservation.button.i01') }}
              v-btn.red.white--text.mt-3(v-if="hasAlreadyReserved" small @click.stop.prevent.native="destroy()")
                span {{ $t('top.dialog.reservation.button.i04') }}
        div(class="reservation" v-if="$s.futurEvent && !$currentUser.id")
          v-layout(row)
            v-flex(xs12) 
              span {{ $t('top.dialog.reservation.i01') }}
          v-layout(row)
            v-flex.text-xs-center(xs12)
              v-btn.primary.mt-3(small @click.stop.prevent.native="goto($router, '/auth/sign-up')")
                span {{ $t('top.dialog.reservation.button.i02') }}

</template>

<!-- ============================================================================ -->

<style lang="stylus">
#top-index-dialog
  .event
    .main-image
      img
        width 100%
        height auto

    .date-location
      font-size 10px
      i
        font-size 15px
        margin-right 3px

    .gmap-section
      a[href^="http://maps.google.com/maps"],
      a[href^="https://maps.google.com/maps"],
      a[href^="https://www.google.com/maps"]
        display: none !important
      
      .gm-bundled-control .gmnoprint
        display: block
      
      .gmnoprint:not(.gm-bundled-control)
        display: none
    
    .details
      font-size 10px

    .reservation
      .sns img
        height: 26px
        width: 26px
        margin-right 15px
      span
        font-size 12px
      i
        font-size 18px
      input[type="text"]
        font-size 10px
      .input-group label
        font-size 10px
        top 5px
      .input-group
        padding-top 5px
      .input-group__selections input
        font-size 10px
      button
        font-size 12px
        height 20px
  
  .pointable
    cursor pointer
  
  .bold
    font-weight 300
    &.underline
      text-decoration: underline
  
  .border-blue-bottom
    border-bottom 1px solid #1a237e

  .border-blue-top
    border-top 1px solid #1a237e
  
  i.icon-blue
    color #1a237e
    font-size 18px
    margin 3px 3px 0 0
  
  .top-event-view
    max-height 70vh

  .p-layout
    width p(900, 312)
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import constants from '~/utils/constants'
import moment from 'moment'
import axios from '~/plugins/axios'
import queryString from 'query-string'

export default {
  mixins: [mixins],
  data () {
    return {
      visible: false,
      firstEventIds: [],
      lastEventIds: [],
      futurEvents: [],
      pastEvents: [],
      name: null,
      email: null,
      expectedPeople: null,
      expectedPeopleItems: this.getSelectOptionsFor(1, 10),
      reservationId: null,
      hasAlreadyReserved: null,
      remainingSpaces: null,
      lat: 0,
      lng: 0,
      gmap: {
        center: {
          lat: 0,
          lng: 0
        },
        markers: [
          {
            position: {
              lat: 0,
              lng: 0
            }
          }
        ],
        zoom: constants.gmap.zoom,
        icon: {
          url: constants.gmap.markerIcon,
          size: {
            width: constants.gmap.width,
            height: constants.gmap.height,
            f: constants.gmap.pixel,
            b: constants.gmap.pixel
          },
          scaledSize: {
            width: constants.gmap.width,
            height: constants.gmap.height,
            f: constants.gmap.pixel,
            b: constants.gmap.pixel
          }
        },
        options: { fullscreenControl: false, clickableIcons: false }
      },
      hashtags: constants.sns.hashtags
    }
  },
  computed: {
    $s () {
      return this.$store.state.top.index
    },
    $currentUser () {
      return this.$store.getters.currentUser
    },
    $currentDay () {
      return moment().format('YYYY-MM-DD')
    },
    $actualMonth () {
      return moment().format('YYYY-MM')
    },
    $currentMonth () {
      return this.$store.state.top.index.currentMonth
    },
    $currentMonths () {
      return this.$store.state.top.index.currentMonths
    },
    $fullPath () {
      return `${this.defaultUrl('frontend')}/${this.$store.state.base.layout.fullPath}`
    },
    $users () {
      return this.$store.state.users.index.users
    },
    event () {
      if (!this.$s.eventId) return
      this.getFuturEvents()
      this.getPastEvents()
      this.name = this.$currentUser.name
      this.email = this.$currentUser.email
      this.firstEventIds = [this.futurEvents[0].id, this.pastEvents[0].id]
      this.lastEventIds = [
        this.futurEvents[this.futurEvents.length - 1].id,
        this.pastEvents[this.pastEvents.length - 1].id
      ]
      let events = this.$s.futurEvent ? this.futurEvents : this.pastEvents
      let event = events.filter(event => event.id === this.$s.eventId)
      if (!event.length) return
      this.remainingSpaces = this.setRemainingSpaces(event[0])
      this.setExpectedPeople(event[0].reservations)
      this.setGmapMarker(event[0].positions)
      return event[0]
    },
    dialog () {
      return this.$s.dialog
    }
  },
  watch: {
    dialog (val) {
      if (!val) return
      this.visible = true
    },
    visible (val) {
      if (val) {
        setTimeout(() => {
          document.querySelector('#top-index-dialog .top-event-view').scrollTop = 0
        }, 0)
        return
      }
      this.push(this.$store, 'top.index', '/top', {
        dialog: false
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.visible = this.$s.dialog
      window.scrollTo(0, this.$s.scroll)
    }, 500)
  },
  methods: {
    getFuturEvents () {
      if (!this.$s.events) return
      this.futurEvents = this.$s.events.filter(
        event => event.date.substr(0, 10) >= this.$currentDay
      )
    },
    getPastEvents () {
      if (!this.$s.events) return
      this.pastEvents = this.$s.events.filter(
        event => event.date.substr(0, 10) < this.$currentDay
      )
    },
    getOrganizerInfos (organizerId) {
      let organizer = this.$users.filter(user => user.id === organizerId)
      if (!organizer) return
      return organizer[0]
    },
    setExpectedPeople (reservations) {
      let reservation = reservations.filter(arr => arr.userId === this.$currentUser.id)
      if (reservation.length) {
        this.reservationId = reservation[0].id
        this.expectedPeople = reservation[0].expectedPeople
        this.hasAlreadyReserved = true
      } else {
        this.expectedPeople = null
        this.hasAlreadyReserved = false
      }
    },
    cancel () {
      this.visible = false
    },
    navigate (direction) {
      let events = this.$s.futurEvent ? this.futurEvents : this.pastEvents
      let oldIndex = events.findIndex(arr => arr.id === this.$s.eventId)
      let newIndex = direction === 'next' ? oldIndex + 1 : oldIndex - 1
      this.push(this.$store, 'top.index', '/top', {
        scroll: window.pageYOffset,
        dialog: true,
        eventId: events[newIndex].id
      })
    },
    destroy () {
      let confirmationText = this.$t('top.dialog.reservation.i03')
      this.confirm({ text: confirmationText })
        .then(async agreed => {
          if (agreed) {
            try {
              await axios({
                ...{
                  method: 'delete',
                  url: `/reservations/${this.reservationId}`,
                  data: {
                    locale: this.$store.state.base.locale.selected
                  }
                },
                ...this.$store.getters.options
              })
              this.reservationId = null
              this.getThreeNextEvents()
            } catch (error) {
              this.message(this.$t('base.axios.failure'))
              console.error(error)
            }
          }
        })
    },
    send (e) {
      this.$validator.validateAll().then(async result => {
        if (!result) return
        try {
          let reservation = {
            event_id: this.$s.eventId,
            user_id: this.$currentUser.id,
            expected_people: this.expectedPeople
          }
          let res = await axios({
            ...{
              method: this.reservationId ? 'put' : 'post',
              url: this.reservationId ? `/reservations/${this.reservationId}` : '/reservations',
              data: {
                reservation: reservation,
                locale: this.$store.state.base.locale.selected
              }
            },
            ...this.$store.getters.options
          })

          if (res.data.status === 'error') {
            this.message(this.$t('base.axios.failure'))
            return
          }
          this.getThreeNextEvents()
          this.message(this.$t('top.dialog.reservation.i02'))
        } catch (error) {
          this.message(this.$t('base.axios.failure'))
          console.error(error)
        }
      })
    },
    async getThreeNextEvents () {
      try {
        let bom = this.$currentMonth.date === this.$actualMonth
          ? this.$currentDay
          : moment(this.$currentMonth.date).format('YYYY-MM-DD')
        let params = queryString.stringify({
          screen: 'top',
          bom: bom,
          eom: this.$currentMonths[this.$currentMonths.length - 1].date
        }, { arrayFormat: 'bracket' })
        let { data } = await axios.get(`/events?${params}`, this.$store.getters.options)
        this.$store.commit('merge', ['top.index', { events: data.data.events }])
      } catch (error) {
        if (error.message === 'Request failed with status code 401') this.reload()
      }
    }
  }
}
</script>
