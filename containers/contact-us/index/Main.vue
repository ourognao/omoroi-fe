<template lang="pug">
v-container#contact-us-index-main(fluid)
  v-layout(xs12) >>> {{ $t('contact-us.index.i01') }} <<<
</template>

<!-- ============================================================================ -->

<style lang="stylus">
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'

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
      return this.$store.state.contactus.index
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
      this.selected = true
    }
  },
  mounted () {
    if (window.pageYOffset === this.$s.scroll) return
    window.scrollTo(0, this.$s.scroll)
  },
  methods: {
    show () {
      console.log('show')
    }
  }
}
</script>
