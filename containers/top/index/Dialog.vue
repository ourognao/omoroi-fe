<template lang="pug">
v-dialog(v-model="visible" scrollable persistent width="100%")
  v-card#top-index-dialog
    v-card-title.pa-0.grey.lighten-5
      span.ml-2 {{ $t('top.dialog.title')}}
      v-spacer
      v-btn(small icon flat @click.stop.prevent.native="cancel")
        v-icon close
    
    v-divider
    
    v-card-text.p-card-text
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
            span {{ event.title }}
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
              

        v-layout.mt-2(row class="border-blue-bottom")
          v-flex.caption(xs12)
            v-icon.mb-1(class="icon-blue icons events") panorama_fish_eye
            span {{ $t('top.dialog.reservation.title') }}
        div(class="reservation")
          v-layout(row)
            v-flex(xs6)
              v-text-field(
                type="text"
                v-model="name"
                name="reservation-name"
                :placeholder="$t('attr.reservation-name')"
                prepend-icon="assignment_ind"
                v-validate="'required'"
                :error-messages="veeErrors.first('reservation-name') || []"
                :readonly="$currentUser ? true : false"
                hide-details
                @keypress.enter.native="send"
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
                name="reservation-email"
                :placeholder="$t('attr.reservation-email')"
                prepend-icon="email"
                v-validate="'required|email'"
                :error-messages="veeErrors.first('reservation-email') || []"
                :readonly="$currentUser ? true : false"
                hide-details
                @keypress.enter.native="send"
              )
          v-layout(row)
            v-flex(xs6)
              v-select(
                v-bind:items="totalGuestItems"
                v-model="totalGuests"
                :placeholder="$t('attr.reservation-total-guests')"
                :error-messages="veeErrors.first('reservation-total-guests') || []"
                v-validate="'required'"
                data-vv-name="reservation-total-guests"
                prepend-icon="people_outline"
              )
            v-flex.text-xs-right(xs6)
              v-btn.primary.mt-3(small @click.stop.prevent.native="send()")
                span {{ $t('top.dialog.reservation.button.i01') }}

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
  
  .p-card-text
    max-height 70vh

  .p-layout
    width p(900, 312)
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import constants from '~/utils/constants'
import moment from 'moment'
import Vue from 'vue'

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
      totalGuests: null,
      totalGuestItems: this.getSelectOptionsFor(0, 10),
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
    $currentMonth () {
      return moment().format('YYYY-MM')
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
      this.name = this.$currentUser ? this.$currentUser.name : null
      this.email = this.$currentUser ? this.$currentUser.email : null
      console.log(this.futurEvents)
      console.log(this.pastEvents)
      this.firstEventIds = [this.futurEvents[0].id, this.pastEvents[0].id]
      console.log(this.futurEvents.length)
      console.log(this.futurEvents.length - 1)
      this.lastEventIds = [
        this.futurEvents[this.futurEvents.length - 1].id,
        this.pastEvents[this.pastEvents.length - 1].id
      ]
      let events = this.$s.futurEvent ? this.futurEvents : this.pastEvents
      let event = events.filter(event => event.id === this.$s.eventId)
      if (!event.length) return
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
          document.querySelector('#top-index-dialog .p-card-text').scrollTop = 0
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
    setGmapMarker (positions) {
      this.gmap.markers[0].position.lat = this.gmap.center.lat = this.lat = parseFloat(positions[0])
      this.gmap.markers[0].position.lng = this.gmap.center.lng = this.lng = parseFloat(positions[1])
      Vue.$gmapDefaultResizeBus.$emit('resize')
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
    send (e) {
      this.$validator.validateAll().then(async result => {
        if (!result) return
        try {
          // let newUser = {
          //   name: this.name,
          //   email: this.email,
          //   password: this.password,
          //   comment: this.comment,
          //   kind: this.kind,
          //   states: this.states,
          //   airbnb_email: this.airbnbEmail || null,
          //   airbnb_password: this.airbnbPassword || null
          // }
          // let res = await axios({
          //   ...{
          //     method: this.$s.userId ? 'put' : 'post',
          //     url: this.$s.userId ? `/users/${this.$s.userId}` : '/users',
          //     data: {
          //       user: newUser,
          //       locale: this.$store.state.base.locale.selected
          //     }
          //   },
          //   ...this.$store.getters.options
          // })

          // if (res.data.status === 'error') {
          //   res.data.errors.name && this.veeErrors.add('user-name', `${this.$t('attr.user-name')}${res.data.errors.name[0]}`)
          //   res.data.errors.email && this.veeErrors.add('user-email', `${this.$t('attr.user-email')}${res.data.errors.email[0]}`)
          //   res.data.errors.password && this.veeErrors.add('user-password', `${this.$t('attr.user-password')}${res.data.errors.password[0]}`)
          //   return
          // }

          // let { data } = await axios.get(`/users?page=${this.$s.page}`, this.$store.getters.options)
          // this.$store.commit('merge', ['users.index', {
          //   users: data.data.users,
          //   totalPages: data.data.totalPages
          // }])

          // this.message(this.$t('users.index.i08'))
          // this.visible = false
        } catch (error) {
          // this.message(this.$t('users.index.i09'))
          console.error(error)
        }
      })
    }
  }
}
</script>
