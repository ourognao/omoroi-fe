export default {
  methods: {
    path (url) {
      let locale = this.$store.state.base.locale.selected
      return (locale === 'ja' ? url : '/' + locale + url)
    },
    goto (router, url) {
      let t = Date.now()
      url = url.indexOf('?') === -1 ? `${url}?t=${t}` : `${url}&t=${t}`
      router.push(this.path(url))
    }
  }
}
