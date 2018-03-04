<template lang="pug">
#layout-default-footer
  v-layout.footer.top-arrow(row)
    v-flex.ma-0(xs12)
      img(src="/images/top/top-arrow.png" usemap="#top-arrow")
      map(name="top-arrow" id="top-arrow")
        area(shape="rect" :coords="topArrowCoords", href="#" @click.stop.prevent="scrollTop()")
  v-layout.footer.dotted-background.logo(row class="mb-2")
    v-flex(xs12 class="text-xs-center")
      img.mt-1(src="/images/logo/original-white.png" @click="goto($router, '/')")
  v-layout.footer.sns(row)
    v-flex.ma-0(xs12 class="text-xs-center black")
      a(href="https://facebook.com/omoroilife" target="_blank")
        img.pointable(src="/images/sns/facebook-mc.png")
      a(href="https://twitter.com/lifeomoroi" target="_blank")
        img.pointable(src="/images/sns/twitter-mc.png")
      a(href="https://line.me/R/ti/p/%40huv3297a" target="_blank")
        img.pointable(src="/images/sns/line-mc.png")
      a(href="https://www.instagram.com/omoroilife" target="_blank")
       img.pointable(src="/images/sns/instagram-mc.png")
      a(href="https://www.youtube.com/channel/UCzk1EkFIfDkMyq43WQYjKQA" target="_blank")
        img.pointable(src="/images/sns/youtube-mc.png")
      a(href="https://www.linkedin.com/company/omoroilife" target="_blank")
        img.pointable(src="/images/sns/linked-in-mc.png")
  v-layout.footer.dotted-background.copyright(row)
    v-flex.ma-0(xs12 class="text-xs-center grey-text") {{ $t('top.footer.copyright') }}
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#layout-default-footer
  .pointable
    cursor pointer

  .footer
    &.dotted-background
      background-color #212121
      background-image -webkit-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%)
      background-image -moz-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%)
      background-image -ms-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%)
      background-image repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%)
      -webkit-background-size 3px 3px
      -moz-background-size 3px 3px
      background-size 3px 3px
    &.top-arrow
      area:hover, area:active, area:focus
          outline: none
          border: 0
      background none
      img
        max-width 100%
        max-height 100%
    &.logo
      padding 2em 0 2.5em 0
      img
        width 50%
    &.sns
      img
        width 32px
        margin 15px 10px 15px 10px
    &.copyright
      padding 2em 0 1em 0
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'

export default {
  mixins: [mixins],
  data () {
    return {
      topArrowCoords: null
    }
  },
  mounted () {
    this.topArrowCoords = window.innerWidth <= 320 ? '125,10,195,41' : '155,10,215,41'
  },

  methods: {
    scrollTop () {
      setTimeout(() => {
        document.documentElement.scroll({
          top: 0,
          behavior: 'smooth'
        })
      }, 100)
    }
  }
}
</script>