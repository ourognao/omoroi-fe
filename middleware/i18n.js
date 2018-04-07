export default function ({ app, store, route, params, error, redirect, hotReload }) {
  if (hotReload) return
  const locale = params.locale || 'ja'
  console.log(store.state.base.locale)
  if (store.state.base.locale.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  store.commit('merge', ['base.locale', { selected: locale }])
  app.i18n.locale = locale
  // app.validator.localize(locale)
  if (locale === 'ja' && route.fullPath.indexOf('/ja') === 0) {
    return redirect(route.fullPath.replace(/^\/ja/, '/'))
  }
}
