<template lang="pug">
  div#top-index-main(fluid)
    v-layout.tabs(row class="hidden-md-only hidden-lg-only hidden-xl-only")
      v-flex.primary(xs4 class="del") {{ $t('top.tabs.social')}}
      v-flex.primary(xs4 class="del") {{ $t('top.tabs.language')}}
      v-flex.primary(xs4) {{ $t('top.tabs.sports')}}
    v-carousel( delimiter-icon="lens" class="hidden-sm-and-down delimiter-background")
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-carousel(class="carouselHeight hidden-md-only hidden-lg-only hidden-xl-only" hide-controls)
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-container
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#top-index-main
  .del
    position: relative
  .del:after
    content: ''
    height: 40%
    width: 1px
    position: absolute
    right: 0
    top: 12px
    background-color: #FFF!important
  .tabs div
    background-color: red
    color: #FFF
    text-align: center
    font-size: 12px
    font-weight: 200
    min-height: 30px
    padding-top: 9px
  .delimiter-background div.carousel__controls
    background: none
    transform: scale(0.5, 0.5)
    -ms-transform: scale(0.5, 0.5)
    -webkit-transform: scale(0.5, 0.5)
  .carouselHeight
    height:200px
</style>

<!-- ============================================================================ -->

<script>
export default {
  data () {
    return {
      pictures: [
        { language: 'jp', src: '/images/top/1.jpg' },
        { language: 'jp', src: '/images/top/2.jpg' },
        { language: 'jp', src: '/images/top/3.jpg' },
        { language: 'jp', src: '/images/top/4.jpg' },
        { language: 'en', src: '/images/top/5.jpg' },
        { language: 'en', src: '/images/top/6.jpg' },
        { language: 'en', src: '/images/top/7.jpg' }
      ]
    }
  }
}
</script>
