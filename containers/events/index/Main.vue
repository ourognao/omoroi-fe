<template lang="pug">
v-container#events-index-main(fluid)
  v-layout(wrap)
    v-tabs(fixed light icons centered)
      v-tabs-slider(class="black")
      v-tab(href="#upcoming-event-tab" @click.stop.prevent.native="updateEvents()" ripple)
        span {{ $t('labels.event.tabs.upcoming-event') }}
      v-tab(href="#past-event-tab" @click.stop.prevent.native="updateEvents('past')" ripple)
        span {{ $t('labels.event.tabs.past-event') }}
      v-tabs-items
        v-tab-item(:value="'upcoming-event-tab'")
          v-flex.text-xs-center.mt-3(xs12)
            v-pagination(
              :length.number="$s.totalPages"
              v-model="page"
              @input="pagerClicked"
              :total-visible="pageVisible"
              circle
            )

          v-flex.text-xs-right(xs12)
            v-btn.primary(small @click.stop.prevent.native="create()")
              v-icon(dark) create
              span {{ $t('events.index.i01') }}

          v-flex.mb-5(xs12 v-for="event in $s.events" :key="event.id")
            v-card(:class="selected === event.id ? 'f-flash' : ''")
              v-card-title.grey.white--text
                v-container(fluid)
                  v-layout(wrap)
                    v-flex(xs3 sm2)
                      span [ {{ event.id }} ]
                    v-flex(xs9 sm3)
                      span {{ event.date }}
                    v-flex(xs12 sm4)
                      span {{ event.location }}
                    v-flex.text-xs-right(xs12 sm3)
                      span {{ formatDatetime(event.createdAt) }}

              v-card-text
                v-container(fluid)
                  v-layout(wrap)
                    v-flex(xs12 md6)
                    v-flex(xs12 md6 text-md-right)
                    v-flex(xs12).grey.lighten-4(v-html="nl2br(event, 'explanation')")

              v-card-actions
                v-spacer

                v-btn(flat primary @click.stop.prevent.native="edit(event)")
                  span {{ $t('events.index.i02') }}
                  span
                    v-icon edit

          v-flex.text-xs-center.mb-2(xs12)
            v-pagination(
              :length.number="$s.totalPages"
              v-model="page"
              @input="pagerClicked"
              :total-visible="pageVisible"
              circle
            )

        v-tab-item(:value="'past-event-tab'")
          v-flex.text-xs-center.mt-3(xs12)
            v-pagination(
              :length.number="$s.totalPages"
              v-model="page"
              @input="pagerClicked"
              :total-visible="pageVisible"
              circle
            )

          v-flex.mb-5(xs12 v-for="event in $s.events" :key="event.id")
            v-card(:class="selected === event.id ? 'f-flash' : ''")
              v-card-title.grey.white--text
                v-container(fluid)
                  v-layout(wrap)
                    v-flex(xs3 sm2)
                      span [ {{ event.id }} ]
                    v-flex(xs9 sm3)
                      span {{ event.date }}
                    v-flex(xs12 sm4)
                      span {{ event.location }}
                    v-flex.text-xs-right(xs12 sm3)
                      span {{ formatDatetime(event.createdAt) }}

              v-card-text
                v-container(fluid)
                  v-layout(wrap)
                    v-flex(xs12 md6)
                    v-flex(xs12 md6 text-md-right)
                    v-flex(xs12).grey.lighten-4(v-html="nl2br(event, 'explanation')")

              v-card-actions
                v-spacer

                v-btn(flat primary @click.stop.prevent.native="edit(event)")
                  span {{ $t('events.index.i02') }}
                  span
                    v-icon edit

          v-flex.text-xs-center.mb-2(xs12)
            v-pagination(
              :length.number="$s.totalPages"
              v-model="page"
              @input="pagerClicked"
              :total-visible="pageVisible"
              circle
            )
</template>

<!-- ============================================================================ -->

<style lang="stylus">
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import axios from '~/plugins/axios'
import queryString from 'query-string'

export default {
  mixins: [mixins],
  data () {
    return {
      currentUser: this.$store.getters.currentUser,
      selected: null,
      pageVisible: 10,
      direction: null
    }
  },
  computed: {
    $s () {
      return this.$store.state.events.index
    },
    dialog () {
      return this.$s.dialog
    },
    page: {
      get () {
        return this.$s.page
      },
      set (val) {
        this.$store.commit('merge', ['events.index', { page: val }])
      }
    }
  },
  watch: {
    dialog (val) {
      if (val) {
        this.selected = null
        return
      }
      if (!this.$s.userId) return
      this.selected = this.$s.userId
    }
  },
  mounted () {
    if (window.pageYOffset === this.$s.scroll) return
    window.scrollTo(0, this.$s.scroll)
  },
  methods: {
    async updateEvents (direction) {
      try {
        this.openWaitingScreen({ onDialog: false })
        this.direction = direction
        let params = queryString.stringify({
          page: 1,
          direction: direction
        }, { arrayFormat: 'bracket' })
        let { data } = await axios.get(`/events?${params}`, this.$store.getters.options)
        this.$store.commit('merge', ['events.index', {
          events: data.data.events,
          scroll: 0,
          eventId: null,
          page: 1,
          totalPages: data.data.totalPages,
          dialog: false
        }])
        this.closeWaitingScreen()
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          this.$router.replace(this.path('/auth/login'))
        }
      }
    },
    pagerClicked (page) {
      this.push(this.$store, 'events.index', '/events', {
        page: page
      })
      this.reloadList()
    },
    async reloadList () {
      try {
        this.openWaitingScreen({ onDialog: false })
        let params = queryString.stringify({
          page: this.$s.page,
          direction: this.direction
        }, { arrayFormat: 'bracket' })
        let { data } = await axios.get(`/events?${params}`, this.$store.getters.options)
        this.$store.commit('merge', ['events.index', {
          events: data.data.events,
          totalPages: data.data.totalPages
        }])
        this.closeWaitingScreen()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          this.$router.replace(this.path('/auth/login'))
        }
      }
    },
    create () {
      this.push(this.$store, 'events.index', '/events', {
        scroll: window.pageYOffset,
        dialog: true,
        eventId: null
      })
    },
    edit (event) {
      this.push(this.$store, 'events.index', '/events', {
        scroll: window.pageYOffset,
        dialog: true,
        eventId: event.id
      })
    }
  }
}
</script>
