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
  }
}
</script>
