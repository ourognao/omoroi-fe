<template lang="pug">
v-dialog(v-model="visible" persistent scrollable width="auto")
  v-card#top-index-dialog
    v-card-title.grey.lighten-5
      v-icon.f-mr1 edit
      span {{ $s.userId ? 'bacher' : 'bago' }}

    v-divider

    v-card-text.p-card-text
      v-container.f-pa0(fluid)
        v-layout.f-pa1.p-layout(wrap align-center)
          v-flex(xs12)
    
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#top-index-dialog
  .p-card-text
    max-height 70vh

  .p-layout
    width p(900, 312)
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'

export default {
  mixins: [mixins],
  data () {
    return {
      mask: true,
      visible: false
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
      if (!val) return
      this.setForm()
      this.visible = true
    },
    visible (val) {
      if (val) {
        setTimeout(() => {
          document.querySelector('#top-index-dialog .p-card-text').scrollTop = 0
        }, 0)
        return
      }
      this.push(this.$store, 'events.index', '/events', {
        dialog: false
      })
    }
  },
  mounted () {
    this.setForm()
    window.scrollTo(0, this.$s.scroll)
    setTimeout(() => {
      this.visible = this.$s.dialog
    }, 500)
  },
  methods: {
    setForm () {
      console.log('set form')
    },
    cancel () {
      this.visible = false
    },
    send (e) {
      console.log('send form')
    }
  }
}
</script>
