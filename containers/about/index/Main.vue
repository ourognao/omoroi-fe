<template lang="pug">
v-container#about-index-main(fluid)
  img(src="/images/about-us/header.jpg")
  v-layout(row class="border-blue-bottom").pb-1
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('about-and-contact-us.index.contact-us.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('about-and-contact-us.index.contact-us.i01') }}
  
  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('about-and-contact-us.index.about-us.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('about-and-contact-us.index.about-us.i01') }}
    v-layout.mt-2(row) {{ $t('about-and-contact-us.index.about-us.i02') }}
    v-layout.mt-2(row) {{ $t('about-and-contact-us.index.about-us.i03') }}
    v-layout.mt-2(row) {{ $t('about-and-contact-us.index.about-us.i04') }}
    v-layout.mt-2(row) {{ $t('about-and-contact-us.index.about-us.i05') }}
    v-layout.mt-2(row) {{ $t('about-and-contact-us.index.about-us.i06') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('about-and-contact-us.index.our-friends.title') }}

  v-layout.mt-2(row v-for="(partner, index) in partners" :key="index" class="partnerDetails")
    v-flex(xs4).pt-2.pb-2
      img(:src="partner.thumbnail")
    v-flex.ml-4(xs8)
      v-layout.mb-1(row)
        v-flex(xs12) {{ $t(`about-and-contact-us.index.our-friends.${partner.name}.title`) }}
      v-layout.mb-1(row)
        v-flex(xs12 class="details") {{ $t(`about-and-contact-us.index.our-friends.${partner.name}.explanation`) }}
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#about-index-main
  .partnerDetails
    border-bottom 1px solid #bdbdbd
    img
      width 100px
      height auto
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'

export default {
  mixins: [mixins],
  data () {
    return {
      currentUser: this.$store.getters.currentUser,
      selected: null,
      partners: [
        { name: 'noritomosan', thumbnail: '/images/partners/logo/noritomosan_original.png' },
        { name: 'pierstand', thumbnail: '/images/partners/logo/pier_stand_simplified.png' },
        { name: 'localirishpub', thumbnail: '/images/partners/logo/local_irish_pub_simplified.png' }
      ]
    }
  }
}
</script>
