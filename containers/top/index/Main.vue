<template lang="pug">
  div#top-index-main(fluid)
    v-carousel( delimiter-icon="lens" class="hidden-sm-and-down delimiterBackground")
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-carousel(class="carouselHeight hidden-md-only hidden-lg-only hidden-xl-only" hide-controls)
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-container
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#top-index-main
  .delimiterBackground div.carousel__controls
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
