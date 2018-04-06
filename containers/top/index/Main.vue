<template lang="pug">
  div#top-index-main(fluid)
    v-layout.tabs(row class="hidden-md-only hidden-lg-only hidden-xl-only fixedTabs")
      v-flex.primary(xs4 class="delimitor") {{ $t('top.index.tabs.social')}}
      v-flex.primary(xs4 class="delimitor") {{ $t('top.index.tabs.language')}}
      v-flex.primary(xs4) {{ $t('top.index.tabs.sports')}}
    v-carousel(delimiter-icon="lens" class="hidden-sm-and-down delimiter-background")
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-carousel(
      class="carouselHeight hidden-md-only hidden-lg-only hidden-xl-only"
      hide-controls
      style="box-shadow:")
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-container.pt-3
      v-layout(row class="eventHeader")
        v-flex.caption(xs12)
          v-icon.mb-1(class="icon-blue icons events") panorama_fish_eye
          | {{ $t('top.index.events.list.title.i04') }}
      div.ma-2.mb-3(class="search-container dotted-background")
        v-layout.pl-2(row wrap)
          v-flex(xs6 v-for="sport in sportItems" :key="sport.value")
            v-checkbox.pt-0(
              color="primary"
              :label="sport.text"
              v-model="sports"
              :value="sport.value"
              hide-details
              @change="getEventsBySport()"
            )
      
      v-layout(row class="eventHeader")
        v-flex.caption(xs5)
          v-icon.mb-1(class="icon-blue icons events") panorama_fish_eye
          | {{ $t('top.index.events.list.title.i01') }}
        v-flex.caption(xs7 class="text-xs-right")
          a(
            href="#"
            v-if="!$currentDate.includes(currentMonth.date)"
            @click.stop.prevent="setMonths(false, currentMonths[0].date)")
            v-icon.mb-1(class="icon-blue icons events") navigate_before
          span(v-for="(month, index) in currentMonths" :key="index")
            a.month(
              href="#"
              :class="currentMonth.date === month.date ? 'grey-text' : 'blue-text'"
              @click.stop.prevent="setMonth(month.date)")
              | {{ $t(`labels.common.months.${month.name}`) }}
          a.next-months(
            href="#"
            @click.stop.prevent="setMonths(true, currentMonths[2].date)")
            v-icon.mb-1(class="icon-blue icons events") navigate_next
      
      div(class="event-container")
        v-layout(v-for="(event, index) in futurEvents" :key="index" class="eventDetails")
          v-flex(xs3)
            img.future(:src="event.picture" style="border-radius:10px")
          v-flex.ml-3(xs7)
            v-layout.mb-1(row)
              v-flex.caption.future(xs12) {{ event.title }}
            v-layout(row)
              v-flex(xs12)
                v-icon event
                span {{ formatDate(event.date) }}
            v-layout(row)
              v-flex(xs12)
                v-icon access_time
                span {{ setTime(event) }}
            v-layout(row)
              v-flex.location(xs12)
                v-icon location_on
                span {{ event.location }}
            v-layout(row)
              v-flex.attending(xs12)
                v-icon people_outline
                span {{ setThreshold(event) === 'red-text' ? $t('top.index.events.list.info.i01') : $t('top.index.events.list.info.i03') }}
                span.ml-1(:class="setThreshold(event)") {{ setAttending(event) }}
          v-flex(xs2 style="line-height: 75px")
            v-btn(flat icon @click.stop.prevent.native="details(event)")
              v-icon.details(class="icon-blue icons events") chevron_right

      v-layout.mt-3(row class="eventHeader")
        v-flex.caption(xs5)
          v-icon.mb-1(class="icon-blue icons events") panorama_fish_eye
          | {{ $t('top.index.events.list.title.i02') }}
        v-flex.caption(xs7 class="text-xs-right")
          a(:href="pastEventsHref") {{ $t('top.index.events.list.title.i03') }}
      v-layout(v-for="(event, index) in pastEvents" :key="index" class="eventDetails")
        v-flex(xs1)
          img.past(:src="event.picture" style="border-radius:10px")
        v-flex.ml-4(xs10)
          v-layout(row)
            v-flex.grey-text.dark(xs12) {{ event.date }}
          v-layout(row)
            v-flex.caption(xs12) {{ event.title }}
          v-layout(row)
            v-flex(xs12 class="explanation") {{ setBeginningOfText(event.explanation) }}
        v-flex(xs1 style="line-height: 50px")
          v-icon.details(class="icon-blue icons events") chevron_right
    
    
</template>

<!-- ============================================================================ -->

<style lang="stylus">
$bg-color = white
$dot-color = #bdbdbd
$dot-size = 1px
$dot-space = 2px

#top-index-main
  .eventHeader
    border-bottom 1px solid #1a237e
    .month
      padding 0 3px 0 3px
    .next-months
      margin-right -6px
    button
      width 20px
  
  .search-container
    border 3px solid #bdbdbd
    i
      font-size 17px
      width 11px
      height 11px
      &.material-icons
        background: white
    label
      margin-left -10px
      font-size 12px
      font-weight 500
      color black
    &.dotted-background
      background:
        linear-gradient(90deg, $bg-color ($dot-space - $dot-size), transparent 1%) center,
        linear-gradient($bg-color ($dot-space - $dot-size), transparent 1%) center,
        $dot-color;
      background-size: $dot-space $dot-space;

  .event-container
    height 15em
    overflow scroll
    max-width 100%
    overflow-x hidden
  
  .eventDetails
    font-size 10px
    padding 5px 0 2px 0
    border-bottom 1px solid #bdbdbd
    .explanation
      font-size:11px
    .caption
      &.future
        margin-left:2px
    img
      &.future
        width 80px
        height 80px
      &.past
        width 40px
        height 40px
    i
      font-size 15px
      margin 0 5px 1px 0
      &.details
        color #bdbdbd
        font-size 35px
  
  .table tr
    border 0
  
  .grey-text
    color #bdbdbd
    &.dark
      color #616161
  
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
      sports: [],
      sportItems: [
        { text: this.$t('labels.common.sports.volleyball'), value: 'volleyball' },
        { text: this.$t('labels.common.sports.kickboxing'), value: 'kickboxing' },
        { text: this.$t('labels.common.sports.basketball'), value: 'basketball' },
        { text: this.$t('labels.common.sports.pingpong'), value: 'pingpong' },
        { text: this.$t('labels.common.sports.badminton'), value: 'badminton' },
        { text: this.$t('labels.common.sports.futsal'), value: 'futsal' },
        { text: this.$t('labels.common.sports.other'), value: 'other' }
      ],
      pastEventsHref: '/team/login',
      pictures: [
        { language: 'jp', src: '/images/top/carousel/1.jpg' },
        { language: 'jp', src: '/images/top/carousel/2.jpg' },
        { language: 'jp', src: '/images/top/carousel/3.jpg' },
        { language: 'jp', src: '/images/top/carousel/4.jpg' },
        { language: 'en', src: '/images/top/carousel/5.jpg' },
        { language: 'en', src: '/images/top/carousel/6.jpg' },
        { language: 'en', src: '/images/top/carousel/7.jpg' }
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
      return [
        moment().format('YYYY-MM'),
        moment().add(1, 'months').format('YYYY-MM'),
        moment().add(2, 'months').format('YYYY-MM')
      ]
    },
    $events () {
      return this.$store.state.top.index.events
    },
    $s () {
      return this.$store.state.top.index
    },
    dialog () {
      return this.$s.dialog
    }
  },
  mounted () {
    this.fakeData(
      this.$store,
      this.getUrlParams().hasOwnProperty('event_id'),
      this.getUrlParams()['event_id']
    )
  },
  methods: {
    details (event) {
      this.push(this.$store, 'top.index', '/top', {
        scroll: window.pageYOffset,
        dialog: true,
        eventId: event.id
      })
    },
    setBeginningOfText (text) {
      if (text.length > 30) {
        return text.substring(0, 30) + '...'
      }
      return text
    },
    getEventsBySport () {
      this.$nextTick(function () {
        this.getEventsByMonth()
      })
    },
    getEventsByMonth () {
      let context = this
      let sports = this.sports.length === 0 ? this.sportItems.map(sport => sport.value) : this.sports
      let futurEvents = []
      if (!this.$events) return
      this.futurEvents = this.$events.filter(function (event) {
        if (event.date.substr(0, 7) === context.currentMonth.date) {
          event.tags.forEach(function (tags) {
            if (sports.includes(tags)) {
              futurEvents.push(event)
            }
          })
        }
      })
      this.futurEvents = futurEvents
    },
    setPastEvents () {
      let context = this
      if (!this.$events) return
      this.$events.filter(function (event) {
        let date = event.date.substr(0, 7)
        let difference = moment(date).diff(context.$currentDate[0])
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
        let currentDate = !date ? context.$currentDate[0] : date
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
