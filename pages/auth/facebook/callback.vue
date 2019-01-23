<template lang="pug">
#auth-facebook-callback
  auth-facebook-callback-main
</template>

<!-- ============================================================================ -->

<script>
import AuthFacebookCallbackMain from '~/containers/auth/facebook/callback/Main'
// import axios from '~/plugins/axios'

export default {
  components: {
    AuthFacebookCallbackMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'auth.facebook.callback', fullPath: route.fullPath }])
    try {
      // let { data } = await axios.get('/auth/facebook')
      console.log('IN CALLBACK PAGE')
      // console.log(data)
      // store.commit('merge', ['auth.facebook', {
      //   dialog: data
      // }])
    } catch (error) {
      if (error.message === 'Request failed with status code 401') {
        redirect('/auth/login')
      }
      console.error(error.message)
    }
  }
}
</script>
