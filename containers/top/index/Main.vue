<template lang="pug">
  v-carousel
    v-carousel-item(v-for="(picture,i) in pictures" v-bind:src="picture.src" :key="i")
    v-container#top-index-main(fluid)
</template>

<!-- ============================================================================ -->

<style lang="stylus">
</style>

<!-- ============================================================================ -->

<script>
export default {
  data () {
    return {
      pictures: [
        { language: 'jp', src: '/images/top/1.jpg' },
        { language: 'jp', src: '/images/top/2.jpg' },
        { language: 'en', src: '/images/top/3.jpg' },
        { language: 'en', src: '/images/top/4.jpg' },
        { language: 'en', src: '/images/top/5.jpg' }
      ]
    }
  }
}
</script>
