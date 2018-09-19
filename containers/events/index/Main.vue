<template lang="pug">
v-container#events-index-main(fluid)
  v-layout(wrap)
    v-flex.text-xs-right(xs12)
      v-btn.primary(@click.stop.prevent.native="create()")
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
</template>

<!-- ============================================================================ -->

<style lang="stylus">
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
// import axios from '~/plugins/axios'
// import queryString from 'query-string'

export default {
  mixins: [mixins],
  data () {
    return {
      currentUser: this.$store.getters.currentUser,
      selected: null
    }
  },
  computed: {
    $s () {
      return this.$store.state.events.index
    },
    dialog () {
      return this.$s.dialog
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
    // async reloadList () {
    //   try {
    //     let params = queryString.stringify({
    //       page: this.$s.page,
    //       q: this.$s.q
    //     }, { arrayFormat: 'bracket' })
    //     let { data } = await axios.get(`/users?${params}`, this.$store.getters.options)
    //     this.$store.commit('merge', ['users.index', {
    //       users: data.data.users,
    //       totalPages: data.data.totalPages
    //     }])
    //     window.scrollTo(0, 0)
    //   } catch (error) {
    //     if (error.message === 'Request failed with status code 401') {
    //       this.$router.replace(this.path('/auth/login'))
    //     }
    //     console.error(error.message)
    //   }
    // },
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
