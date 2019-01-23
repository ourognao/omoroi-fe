<template lang="pug">
#auth-facebook
  auth-facebook-main
</template>

<!-- ============================================================================ -->

<script>
import AuthFacebookMain from '~/containers/auth/facebook/Main'
import axios from '~/plugins/axios'

export default {
  components: {
    AuthFacebookMain
  },
  head () {
    return {
      title: `${this.$t('base.head.title')}`
    }
  },
  async asyncData ({ query, route, store, redirect }) {
    store.commit('merge', ['base.layout', { current: 'auth.facebook.callback', fullPath: route.fullPath }])
    try {
      let { data } = await axios.get('/auth/facebook')
      console.log(data)
      console.log('IN FACEBOOK PAGE')
      store.commit('merge', ['auth.facebook', {
        dialog: data
      }])
    } catch (error) {
      if (error.message === 'Request failed with status code 401') {
        redirect('/auth/login')
      }
      console.error(error.message)
    }
  }
}
</script>
