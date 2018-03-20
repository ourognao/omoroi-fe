import changeCase from 'change-case'
import queryString from 'query-string'
import moment from 'moment'

export default {
  methods: {
    formatDate (date) {
      let locale = this.$store.state.base.locale.selected
      let formatted = locale === 'ja' ? 'YYYY年MM月DD (dd)' : 'ddd, MMMM D, YYYY'
      moment.locale(locale)
      return moment(date).format(formatted)
    },
    path (url) {
      let locale = this.$store.state.base.locale.selected
      return (locale === 'ja' ? url : '/' + locale + url)
    },
    push (store, key, path, hash) {
      store.commit('merge', [key, hash])

      let hash2 = {}
      for (let key in hash) {
        hash2[changeCase.snakeCase(key)] = hash[key]
      }
      let params = queryString.stringify(hash2)
      let localePath = store.state.base.locale.selected === 'en' ? `/en${path}` : path
      window.history.pushState(null, null, `${localePath}?${params}`)
      store.commit('merge', ['base.layout', {
        fullPath: `${localePath}?${params}`
      }])
    },
    goto (router, url) {
      let t = Date.now()
      url = url.indexOf('?') === -1 ? `${url}?t=${t}` : `${url}&t=${t}`
      router.push(this.path(url))
    }
  }
}
