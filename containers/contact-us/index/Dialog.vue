<template lang="pug">
v-dialog(v-model="visible" scrollable persistent width="auto")
  v-card#contact-us-index-dialog
    v-card-title.pa-0.contact-us-section.primary
      v-spacer
      v-btn(small icon flat @click.stop.prevent.native="cancel")
        v-icon close
    
    v-divider
    
    no-ssr
      v-card-text.contact-us-view.pt-0
        v-container.pa-0(fluid class="contact-us")

</template>

<!-- ============================================================================ -->

<style lang="stylus">
#contact-us-index-dialog
  .contact-us-section
    height 20px
    .v-icon
      font-size 15px
      color white
  
  .contact-us-view
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
      return this.$store.state.contactus.index
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
          document.querySelector('#contact-us-index-dialog .contact-us-view').scrollTop = 0
          document.body.classList.add('freeze-body')
        }, 0)
        return
      }
      this.push(this.$store, 'contactus.index', '/contact-us', {
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
