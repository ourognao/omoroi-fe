<template lang="pug">
  div#top-index-main(fluid)
    v-layout.tabs(row class="hidden-md-only hidden-lg-only hidden-xl-only fixedTabs")
      v-flex.primary.after-delimitor(
        xs4
        :class="sectionFilterColor('SC')"
        @click="changeSection('SC')") {{ $t('top.index.tabs.social') }}
      v-flex.primary.before-delimitor.after-delimitor(
        xs4
        :class="sectionFilterColor('LX')"
        @click="changeSection('LX')") {{ $t('top.index.tabs.language') }}
      v-flex.primary.before-delimitor(
        xs4
        :class="sectionFilterColor('SP')"
        @click="changeSection('SP')") {{ $t('top.index.tabs.sports') }}
    v-carousel(delimiter-icon="lens" class="hidden-sm-and-down delimiter-background")
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-carousel(
      class="hidden-md-only hidden-lg-only hidden-xl-only"
      height="200"
      hide-controls
      style="box-shadow:")
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    
    

    v-container.pt-0
      v-layout(row wrap).text-xs-center.mt-2
        v-flex(md12 class="grey-text dark") {{ $t('top.index.subtitles.i01') }}
        v-flex(xs12 class="grey-text dark") {{ $t('top.index.subtitles.i02') }}
        v-flex(xs12 class="grey-text dark").mt-2 {{ section ? $t(`top.index.subtitles.section.${section}`) : $t('top.index.subtitles.section.all') }}

      div(class="hidden-sm-and-down")
        v-layout(row).border-section-blue-bottom
          v-flex(md4).section-desktop-bg
            v-layout(row wrap)
              v-flex(md12).mt-4
                v-layout(row wrap).text-md-center
                  v-flex(md12)
                    v-btn.primary.desktop-section-btn.mt-0(
                    :class="sectionFilterColor('SC')"
                    @click="changeSection('SC')")
                      span {{ $t('top.index.tabs.social') }}
                  v-flex(md12)
                    v-btn.primary.desktop-section-btn(
                    :class="sectionFilterColor('LX')"
                    @click="changeSection('LX')")
                      span {{ $t('top.index.tabs.language') }}
                  v-flex(md12)
                    v-btn.primary.desktop-section-btn(
                    :class="sectionFilterColor('SP')"
                    @click="changeSection('SP')")
                      span {{ $t('top.index.tabs.sports') }}
              v-flex(md12).mt-4
                v-layout(row).text-md-center
                  v-flex(md12 v-if="section === 'SP'").ml-5.mr-5
                    div(class="search-container dotted-background")
                      v-layout.pa-2(row wrap)
                        v-flex(xs6 v-for="sport in sportItems" :key="sport.value")
                          v-checkbox.pt-0.mt-0(
                            color="primary"
                            :label="sport.text"
                            v-model="sports"
                            :value="sport.value"
                            hide-details
                            @change="getEventsBySport()"
                          )
                  v-flex(md12 v-else)
                    img(:src="sectionPictureSrc").border-radius.ten.ml-5.mr-5
          v-flex(md6).offset-md1.eventHeaderBorder.mb-4.mt-4
            v-layout(row class="eventHeader").pa-2
              v-flex.caption(md5)
                v-icon.mb-1(class="icon-blue ajusted icons events") panorama_fish_eye
                | {{ $t('top.index.events.list.title.i01') }}
              v-flex.caption(md7 class="text-md-right")
                a(
                  href="#"
                  v-if="!$currentDate.includes(currentMonth.date)"
                  @click.stop.prevent="setMonths(false, currentMonths[0].date)")
                  v-icon.mb-1(class="icon-blue more-ajusted icons events") navigate_before
                span(v-for="(month, index) in currentMonths" :key="index")
                  a.month(
                    href="#"
                    :class="currentMonth.date === month.date ? 'grey-text' : 'blue-text'"
                    @click.stop.prevent="setMonth(month.date)")
                    | {{ $t(`labels.common.months.${month.name}`) }}
                a.next-months(
                  href="#"
                  @click.stop.prevent="setMonths(true, currentMonths[2].date)")
                  v-icon.mb-1(class="icon-blue more-ajusted icons events") navigate_next
            
            div(class="event-container desktop").pa-2
              v-layout(v-if="futurEvents.length === 0")
                v-flex(md12).text-md-center.caption.mt-2 {{ $t('top.index.events.list.common.no-event') }}
              v-layout(v-for="(event, index) in futurEvents" :key="index" class="eventDetails")
                v-flex(md3)
                  img(:src="event.thumbnail").border-radius.ten
                v-flex.ml-4(md8)
                  v-layout.mb-1(row)
                    v-flex.caption.future(md12) {{ displayEventTitle(section, event, { fromTopPage: true }) }}
                  v-layout(row)
                    v-flex(md12)
                      v-icon event
                      span {{ formatDate(event.date) }}
                  v-layout(row)
                    v-flex(md12)
                      v-icon access_time
                      span {{ setTime(event) }}
                  v-layout(row)
                    v-flex.location(md12)
                      v-icon location_on
                      span(class="hidden-md-only hidden-lg-only hidden-xl-only") {{ truncate(event, 20, 'location') }}
                      span(class="hidden-sm-and-down") {{ displayLocationName(event) }}
                  v-layout(row)
                    v-flex.attending(md12)
                      v-icon people_outline
                      span {{ setThreshold(event) === 'red-text' ? $t('top.index.events.list.info.i01') : $t('top.index.events.list.info.i03') }}
                      span.ml-1(:class="setThreshold(event)") {{ setAttending(event) }}
                v-flex(md1 style="line-height: 75px")
                  v-btn.ma-0(flat icon @click.stop.prevent.native="details(event, true)")
                    v-icon.details(class="icon-blue icons events") chevron_right

      

      div(class="hidden-md-only hidden-lg-only hidden-xl-only")
        div(v-if="section === 'SP'").mt-2
          v-layout(row class="eventHeader")
            v-flex.caption(xs12)
              v-icon.mb-1(class="icon-blue ajusted icons events") panorama_fish_eye
              | {{ $t('top.index.events.list.title.i04') }}
          div.ma-2.mb-3(class="search-container dotted-background")
            v-layout.pa-2(row wrap)
              v-flex(xs6 v-for="sport in sportItems" :key="sport.value")
                v-checkbox.pt-0.mt-0(
                  color="primary"
                  :label="sport.text"
                  v-model="sports"
                  :value="sport.value"
                  hide-details
                  @change="getEventsBySport()"
                )
        v-layout(row class="eventHeader")
          v-flex.caption(xs5)
            v-icon.mb-1(class="icon-blue ajusted icons events") panorama_fish_eye
            | {{ $t('top.index.events.list.title.i01') }}
          v-flex.caption(xs7 class="text-xs-right")
            a(
              href="#"
              v-if="!$currentDate.includes(currentMonth.date)"
              @click.stop.prevent="setMonths(false, currentMonths[0].date)")
              v-icon.mb-1(class="icon-blue more-ajusted icons events") navigate_before
            span(v-for="(month, index) in currentMonths" :key="index")
              a.month(
                href="#"
                :class="currentMonth.date === month.date ? 'grey-text' : 'blue-text'"
                @click.stop.prevent="setMonth(month.date)")
                | {{ $t(`labels.common.months.${month.name}`) }}
            a.next-months(
              href="#"
              @click.stop.prevent="setMonths(true, currentMonths[2].date)")
              v-icon.mb-1(class="icon-blue more-ajusted icons events") navigate_next
        
        div(class="event-container mobile")
          v-layout(v-if="futurEvents.length === 0")
            v-flex(xs12).text-xs-center.caption.mt-2 {{ $t('top.index.events.list.common.no-event') }}
          v-layout(v-for="(event, index) in futurEvents" :key="index" class="eventDetails")
            v-flex(xs3)
              img(:src="event.thumbnail").border-radius.ten
            v-flex.ml-4(xs8)
              v-layout.mb-1(row)
                v-flex.caption.future(xs12) {{ displayEventTitle(section, event, { fromTopPage: true }) }}
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
                  span(class="hidden-md-only hidden-lg-only hidden-xl-only") {{ displayLocationName(event) }}
                  span(class="hidden-sm-and-down") {{ displayLocationName(event) }}
              v-layout(row)
                v-flex.attending(xs12)
                  v-icon people_outline
                  span {{ setThreshold(event) === 'red-text' ? $t('top.index.events.list.info.i01') : $t('top.index.events.list.info.i03') }}
                  span.ml-1(:class="setThreshold(event)") {{ setAttending(event) }}
            v-flex(xs1 style="line-height: 75px")
              v-btn.ma-0(flat icon @click.stop.prevent.native="details(event, true)")
                v-icon.details(class="icon-blue icons events") chevron_right

      







      v-layout.mt-3(row class="eventHeader")
        v-flex.caption(xs5)
          v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
          | {{ $t('top.index.events.list.title.i02') }}
        v-flex.caption(xs7 class="text-xs-right")
          a(v-if="$realEnv !== 'production'" :href="pastEventsHref") {{ $t('top.index.events.list.title.i03') }}
      v-layout(v-if="pastEvents.length === 0")
          v-flex(xs12).text-xs-center.caption.mt-2 {{ $t('top.index.events.list.common.no-past-event') }}
      v-layout(v-for="(event, index) in pastEvents" :key="index" class="eventDetails")
        v-flex(xs1)
          img.past(:src="event.thumbnail").border-radius.ten
        v-flex.ml-4(xs10)
          v-layout(row)
            v-flex.grey-text.dark(xs12) {{ event.date }}
          v-layout(row)
            v-flex.caption(xs12) {{ displayEventTitle(null, event, { fromTopPage: true }) }}
          v-layout(row)
            v-flex(xs12 class="hidden-md-only hidden-lg-only hidden-xl-only explanation") {{ truncate(event, 30, 'explanation') }}
            v-flex(xs12 class="hidden-sm-and-down explanation") {{ truncate(event, 160, 'explanation') }}
        v-flex(xs1 style="line-height: 50px")
          v-btn(flat icon @click.stop.prevent.native="details(event, false)")
            v-icon.details(class="icon-blue icons events") chevron_right
</template>

<!-- ============================================================================ -->

<style lang="stylus">
$bg-color = white
$dot-color = #bdbdbd
$dot-size = 1px
$dot-space = 2px

#top-index-main
  .section-desktop-bg
    background: url('/images/top/section-desktop-bg.png') no-repeat
    background-size contain
  
  .border-section-blue-bottom
    border-bottom 2px solid #1a237e
  
  .border-radius
    &.ten
      border-radius:10px
  
  .desktop-section-btn
    min-width 150px
  
  .eventHeaderBorder
    border 2px solid #1a237e
  
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
      margin-bottom 10px
      font-size 10px
      font-weight 500
      color black
    &.dotted-background
      background:
        linear-gradient(90deg, $bg-color ($dot-space - $dot-size), transparent 1%) center,
        linear-gradient($bg-color ($dot-space - $dot-size), transparent 1%) center,
        $dot-color;
      background-size: $dot-space $dot-space;

  .event-container
    overflow scroll
    max-width 100%
    overflow-x hidden
    &.desktop
      height 20em
    &.mobile
      height 15em
    
  
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
        margin-left -20px
  
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
    &.ajusted
      margin-bottom 2px!important
    &.more-ajusted
      margin-bottom 1px!important
  
  .icons
    &.events
      font-weight bold
  
  .fixedTabs
    position fixed
    top 60px
    width 100%
    z-index 2
    .selected
      background-color #f5f5f5!important
      border 1px solid #1a237e
      color #1a237e
  
  .before-delimitor
    position relative

  .after-delimitor
    position relative
  
  .before-delimitor:before
    content ''
    height 40%
    width 1px
    position absolute
    left 0
    top 6px
    background-color #FFF!important
    
  .after-delimitor:after
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
  
  .v-carousel__controls
    background none
    transform scale(0.5, 0.5)
    -ms-transform scale(0.5, 0.5)
    -webkit-transform scale(0.5, 0.5)

</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import moment from 'moment'
import axios from '~/plugins/axios'
import queryString from 'query-string'

export default {
  mixins: [mixins],
  data () {
    return {
      sectionItems: [
        { text: this.$t('top.index.tabs.social'), value: 'SC' },
        { text: this.$t('top.index.tabs.language'), value: 'LX' },
        { text: this.$t('top.index.tabs.sports'), value: 'SP' }
      ],
      sports: [],
      sportItems: [
        { text: this.$t('labels.sports.volleyball'), value: 'volleyball' },
        { text: this.$t('labels.sports.kickboxing'), value: 'kickboxing' },
        { text: this.$t('labels.sports.basketball'), value: 'basketball' },
        { text: this.$t('labels.sports.pingpong'), value: 'pingpong' },
        { text: this.$t('labels.sports.badminton'), value: 'badminton' },
        { text: this.$t('labels.sports.futsal'), value: 'futsal' },
        { text: this.$t('labels.sports.tennis'), value: 'tennis' },
        { text: this.$t('labels.sports.other'), value: 'other' }
      ],
      pastEventsHref: '/team/login',
      pictures: [
        { language: 'ja', src: '/images/top/carousel/1.jpg' },
        { language: 'ja', src: '/images/top/carousel/2.jpg' },
        { language: 'ja', src: '/images/top/carousel/3.jpg' },
        { language: 'ja', src: '/images/top/carousel/4.jpg' },
        { language: 'en', src: '/images/top/carousel/5.jpg' },
        { language: 'en', src: '/images/top/carousel/6.jpg' },
        { language: 'en', src: '/images/top/carousel/7.jpg' }
      ],
      sectionPictureSrc: '/images/top/omoroi-desktop-all.jpg',
      sectionPictures: [
        { language: 'ja', section: 'LX', src: '/images/top/omoroi-desktop-language.jpg' },
        { language: 'ja', section: 'SC', src: '/images/top/omoroi-desktop-social.jpg' },
        { language: 'en', section: 'LX', src: '/images/top/omoroi-desktop-language.jpg' },
        { language: 'en', section: 'SC', src: '/images/top/omoroi-desktop-social.jpg' }
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
    section: {
      get: function () { return this.$s.section },
      set: function (val) { this.$store.commit('merge', ['top.index', { section: val }]) }
    },
    $currentDay () {
      return moment().format('YYYY-MM-DD')
    },
    $actualMonth () {
      return moment().format('YYYY-MM')
    },
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
    },
    $local () {
      return this.$store.state.base.locale.selected
    }
  },
  watch: {
    $events () {
      this.getEventsByMonth()
    }
  },
  methods: {
    displaySectionPicture () {
      if (this.section === 'SP') return
      let sectionPicture = this.sectionPictures.filter(
        sectionPicture => sectionPicture.language === this.$locale &&
          sectionPicture.section === this.section
      )[0]
      this.sectionPictureSrc = sectionPicture.src
    },
    changeSection (section) {
      this.section = section
      this.getEventsByMonth()
      this.setPastEvents()
      this.displaySectionPicture()
    },
    sectionFilterColor (section) {
      return this.section === section ? 'selected' : ''
    },
    details (event, futurEvent) {
      this.push(this.$store, 'top.index', '/top', {
        scroll: window.pageYOffset,
        dialog: true,
        eventId: event.id,
        section: this.section,
        cmd: this.currentMonth.date,
        cmn: this.currentMonth.name,
        cgmad: this.currentMonths[0].date,
        cgman: this.currentMonths[0].name,
        cgmbd: this.currentMonths[1].date,
        cgmbn: this.currentMonths[1].name,
        cgmcd: this.currentMonths[2].date,
        cgmcn: this.currentMonths[2].name,
        futurEvent: futurEvent
      })
      this.$store.commit('merge', ['top.index', {
        currentMonth: this.currentMonth,
        currentMonths: this.currentMonths
      }])
    },
    getEventsBySport () {
      this.$nextTick(function () {
        this.getEventsByMonth()
      })
    },
    async getThreeNextEvents () {
      try {
        this.openWaitingScreen({ onDialog: false })
        let bom = this.currentMonth.date === this.$actualMonth
          ? this.$currentDay
          : moment(this.currentMonth.date).format('YYYY-MM-DD')
        let params = queryString.stringify({
          screen: 'top',
          bom: bom,
          eom: this.currentMonths[this.currentMonths.length - 1].date
        }, { arrayFormat: 'bracket' })
        let { data } = await axios.get(`/events?${params}`, this.$store.getters.options)
        this.$store.commit('merge', ['top.index', { events: data.data.events }])
        this.getEventsByMonth()
        this.closeWaitingScreen()
      } catch (error) {
        if (error.message === 'Request failed with status code 401') this.reload()
      }
    },
    getEventFilter () {
      switch (this.section) {
        case 'SC':
          return []
        case 'LX':
          return []
        case 'SP':
          return this.sports.length === 0 ? this.sportItems.map(sport => sport.value) : this.sports
      }
    },
    getEventsByMonth () {
      let context = this
      let futurEvents = []
      let section = this.section
      let eventFilter = this.getEventFilter()
      if (!this.$events) return
      this.$events.filter(function (event) {
        if ((event.date.substr(0, 7) === context.currentMonth.date) &&
          (event.date >= context.$currentDay)) {
          if (!section) {
            futurEvents.push(event)
          } else if (event.section.includes(section)) {
            if (eventFilter.length === 0) {
              futurEvents.push(event)
            } else {
              event.tags.forEach(function (tags) {
                if (eventFilter.length === 0 || eventFilter.includes(tags)) {
                  futurEvents.push(event)
                }
              })
            }
          }
        }
      })
      this.futurEvents = futurEvents
    },
    setPastEvents () {
      if (!this.$events) return
      let context = this
      let pastEvents = []
      let section = this.section
      let eventFilter = this.getEventFilter()
      this.$events.filter(function (event) {
        if (pastEvents.length < 3 && moment(event.date).format('YYYY-MM-DD') < context.$currentDay) {
          if (!section) {
            pastEvents.push(event)
          } else if (event.section.includes(section)) {
            event.tags.forEach(function (tags) {
              if (eventFilter.length === 0 || eventFilter.includes(tags)) {
                pastEvents.push(event)
              }
            })
          }
        }
      })
      this.pastEvents = pastEvents
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
        let currentDate = !date ? context.$actualMonth : date
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
        if (!date) {
          date = context.currentMonths[0].date
        }
        context.getThreeNextEvents()
        context.setPastEvents()
        context.getEventsByMonth()
      }, 100)
    }
  }
}
</script>
