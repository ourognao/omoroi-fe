<template lang="pug">
  div#top-index-main(fluid)
    v-layout.tabs(row class="hidden-md-only hidden-lg-only hidden-xl-only fixedTabs")
      v-flex.primary(xs4 class="delimitor") {{ $t('top.tabs.social')}}
      v-flex.primary(xs4 class="delimitor") {{ $t('top.tabs.language')}}
      v-flex.primary(xs4) {{ $t('top.tabs.sports')}}
    v-carousel(delimiter-icon="lens" class="hidden-sm-and-down delimiter-background")
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-carousel(
      class="carouselHeight hidden-md-only hidden-lg-only hidden-xl-only"
      hide-controls
      style="box-shadow:")
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-container
      v-layout(row class="eventHeader")
        v-flex.caption(xs5)
          v-icon.mb-1(class="icon-blue icons events") panorama_fish_eye
          | {{ $t('top.events.list.title.i01') }}
        v-flex.caption(xs7)
          v-btn.navigate-btn(
            icon
            v-if="currentMonth.date !== $currentDate"
            @click.stop.prevent.native="setMonths(false, currentMonths[0].date)")
            v-icon.mb-1(class="icon-blue icons events") navigate_before
          span(v-for="(month, index) in currentMonths" :key="index")
            a.month(
              href="#"
              :class="currentMonth.date === month.date ? 'grey-text' : 'blue-text'"
              @click.stop.prevent="setMonth(month.date)")
              | {{ $t(`labels.common.months.${month.name}`) }}
          v-btn.navigate-btn(icon @click="setMonths(true, currentMonths[2].date)")
            v-icon.mb-1(class="icon-blue icons events") navigate_next
      div(class="event-container")
        v-layout(v-for="(event, index) in futurEvents" :key="index" class="eventDetails")
          v-flex(xs4)
            img.future(:src="event.picture" style="border-radius:10px")
          v-flex(xs8 class="rightSection")
            v-layout(row)
              v-flex.caption(xs12) {{ event.title }}
            v-layout.pt-1(row)
              v-flex.location(xs12)
                v-icon location_on
                span {{ event.location }}
            v-layout.mt-2(row)
              v-flex(xs6)
                v-icon event
                span {{ event.date }}
              v-flex.attending(xs6)
                | {{ $t('top.events.list.info.i01') }}
                span.ml-1.red-text {{ setAttending(event) }}
            v-layout.mt-2(row)
              v-flex(xs6)
                v-icon access_time
                span {{ setTime(event) }}
              v-flex(xs6)
                v-btn.primary {{ $t('top.events.list.common.more') }}

      v-layout.mt-4(row class="eventHeader")
        v-flex.caption(xs5)
          v-icon.mb-1(class="icon-blue icons events") panorama_fish_eye
          | {{ $t('top.events.list.title.i02') }}
        v-flex.caption(xs7 class="text-xs-right")
          a(:href="pastEventsHref") {{ $t('top.events.list.title.i03') }}
      v-layout(v-for="(event, index) in pastEvents" :key="index" class="eventDetails")
        v-flex(xs2)
          img.past(:src="event.picture" style="border-radius:10px")
        v-flex.ml-3(xs9 class="rightSection")
          v-layout(row)
            v-flex.grey-text(xs12) {{ event.date }}
          v-layout(row)
            v-flex.caption(xs12) {{ event.title }}
        v-flex(xs1 style="line-height: 50px")
          v-icon.past-details(class="icon-blue icons events") chevron_right
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#top-index-main
  .eventHeader
    border-bottom 1px solid #1a237e
    .month
      padding 0 3px 0 3px
    
    button
      width 20px
  
  .navigate-btn
    height 0
    margin 0
    margin-bottom 20px
  
  .event-container
    height 15em
    overflow scroll
  
  .eventDetails
    font-size 10px
    padding 5px 0 2px 0
    border-bottom 1px solid #bdbdbd
    img
      &.future
        width 100px
        height 85px
      &.past
        width 60px
        height 60px
    i
      font-size 15px
      margin 0 5px 1px 0
      &.past-details
        color #bdbdbd
        font-size 35px
  
  .rightSection
    margin-left 10px
    button
      height 20px
      font-size 11px
      margin-top -5px
      margin-left 0
  
  .table tr
    border 0
  
  .grey-text
    color #bdbdbd

  .red-text
    color #C62828

  .blue-text
    color #1a237e
  
  i.icon-blue
    color #1a237e
    font-size 12px
    margin 3px 3px 0 0
  
  .icons
    &.events
      font-weight bold
  
  .fixedTabs
    position fixed
    top 60px
    width 100%
    z-index 2
  
  .delimitor
    position relative
  
  .delimitor:after
    content ''
    height 40%
    width 1px
    position absolute
    right 0
    top 6px
    background-color #FFF!important
  
  .tabs div
    color: #FFF
    text-align center
    font-size 12px
    font-weight 500
    min-height 20px
    padding-top 2px
  
  .delimiter-background div.carousel__controls
    background none
    transform scale(0.5, 0.5)
    -ms-transform scale(0.5, 0.5)
    -webkit-transform scale(0.5, 0.5)
  
  .carouselHeight
    height 200px
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import moment from 'moment'

export default {
  mixins: [mixins],
  data () {
    return {
      pastEventsHref: '/team/login',
      pictures: [
        { language: 'jp', src: '/images/top/1.jpg' },
        { language: 'jp', src: '/images/top/2.jpg' },
        { language: 'jp', src: '/images/top/3.jpg' },
        { language: 'jp', src: '/images/top/4.jpg' },
        { language: 'en', src: '/images/top/5.jpg' },
        { language: 'en', src: '/images/top/6.jpg' },
        { language: 'en', src: '/images/top/7.jpg' }
      ],
      currentMonth: [],
      currentMonths: this.setMonths(true),
      months: [
        { text: this.$t('labels.common.months.jan'), value: 'jan', calendarMonth: '01' },
        { text: this.$t('labels.common.months.feb'), value: 'feb', calendarMonth: '02' },
        { text: this.$t('labels.common.months.mar'), value: 'mar', calendarMonth: '03' },
        { text: this.$t('labels.common.months.apr'), value: 'apr', calendarMonth: '04' },
        { text: this.$t('labels.common.months.may'), value: 'may', calendarMonth: '05' },
        { text: this.$t('labels.common.months.jun'), value: 'jun', calendarMonth: '06' },
        { text: this.$t('labels.common.months.jul'), value: 'jul', calendarMonth: '07' },
        { text: this.$t('labels.common.months.aug'), value: 'aug', calendarMonth: '08' },
        { text: this.$t('labels.common.months.sept'), value: 'sept', calendarMonth: '09' },
        { text: this.$t('labels.common.months.oct'), value: 'oct', calendarMonth: '10' },
        { text: this.$t('labels.common.months.nov'), value: 'nov', calendarMonth: '11' },
        { text: this.$t('labels.common.months.dec'), value: 'dec', calendarMonth: '12' }
      ],
      futurEvents: [],
      pastEvents: []
    }
  },
  computed: {
    $currentDate () {
      return moment().format('YYYY-MM')
    },
    $events () {
      return this.$store.state.events.index.events
    }
  },
  methods: {
    setTime (event) {
      return event.endTime ? `${event.startTime}-${event.endTime}` : event.startTime
    },
    setAttending (event) {
      return event.remaining === event.capacity
        ? this.$t('top.events.list.info.i02')
        : `${event.remaining}/${event.capacity}`
    },
    getEventsByMonth () {
      this.futurEvents = this.$events.filter(
        event => event.date.substr(0, 7) === this.currentMonth.date
      )
    },
    setPastEvents () {
      let context = this
      this.$events.filter(function (event) {
        let date = event.date.substr(0, 7)
        let difference = moment(date).diff(context.$currentDate)
        if (context.pastEvents.length < 3 && difference < 0) {
          context.pastEvents.push(event)
        }
      })
    },
    setMonth (date) {
      this.currentMonth = {
        name: this.getMonth(this.extractMonth(date)).value,
        date: date
      }
      this.getEventsByMonth()
    },
    getMonth (calendarMonth) {
      let index = this.months.findIndex(arr => arr.calendarMonth === calendarMonth)
      return this.months[index]
    },
    extractMonth (date) {
      return date.split('-')[1]
    },
    setMonths (forward, date) {
      let context = this
      let currentThreeMonths = []
      let monthIndex = moment(date)
      let currentMonth = moment().format('YYYY-MM')
      setTimeout(function () {
        let currentDate = !date ? context.$currentDate : date
        for (let i = 0; i < 3; i++) {
          if (currentDate === currentMonth) {
            currentThreeMonths.push({
              name: context.getMonth(context.extractMonth(currentMonth)).value,
              date: currentMonth
            })
            currentDate = null
            continue
          }
          let monthIndexDate = forward
            ? monthIndex.add(1, 'months').format('YYYY-MM')
            : monthIndex.subtract(1, 'months').format('YYYY-MM')
          currentThreeMonths.push({
            name: context.getMonth(context.extractMonth(monthIndexDate)).value,
            date: monthIndexDate
          })
        }
        currentThreeMonths = forward ? currentThreeMonths : currentThreeMonths.reverse()
        context.currentMonth = currentThreeMonths[0]
        context.currentMonths = currentThreeMonths
        context.getEventsByMonth()
        context.setPastEvents()
      }, 100)
    }
  }
}
</script>
