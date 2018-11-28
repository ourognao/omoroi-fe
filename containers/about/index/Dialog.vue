<template lang="pug">
v-dialog(v-model="visible" scrollable persistent width="auto")
  v-card#about-index-dialog
    v-card-title.pa-0.about-section.primary
      v-spacer
      v-btn(small icon flat @click.stop.prevent.native="cancel")
        v-icon close
    
    v-divider
    
    no-ssr
      v-card-text.about-view.pt-0
        v-container.pa-0(fluid class="about")

</template>

<!-- ============================================================================ -->

<style lang="stylus">
#about-index-dialog
  .about-section
    height 20px
    .v-icon
      font-size 15px
      color white
  
  .about-view
    max-height 70vh
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'

export default {
  mixins: [mixins],
  data () {
    return {
      visible: false
    }
  },
  computed: {
    $s () {
      return this.$store.state.about.index
    },
    $currentUser () {
      return this.$store.getters.currentUser
    },
    dialog () {
      return this.$s.dialog
    },
    $local () {
      return this.$store.state.base.locale.selected
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
          document.querySelector('#about-index-dialog .about-view').scrollTop = 0
          document.body.classList.add('freeze-body')
        }, 0)
        return
      }
      this.push(this.$store, 'about.index', '/about', {
        dialog: false
      })
      document.body.classList.remove('freeze-body')
    }
  },
  mounted () {
    setTimeout(() => {
      this.visible = this.$s.dialog
      window.scrollTo(0, this.$s.scroll)
    }, 500)
  },
  methods: {
    cancel () {
      this.visible = false
    }
  }
}
</script>
