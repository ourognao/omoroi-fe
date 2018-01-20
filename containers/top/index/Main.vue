<template lang="pug">
  div#top-index-main(fluid)
    v-carousel(class="hidden-sm-and-down")
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-carousel(class="carouselHeight hidden-md-only hidden-lg-only hidden-xl-only" hide-controls lazy)
      v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-container
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#top-index-main
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
