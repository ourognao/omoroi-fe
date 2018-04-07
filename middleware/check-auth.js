import { getAuthFromCookie, getAuthFromLocalStorage } from '~/utils/auth'

export default function ({ store, req }) {
  let isServer = process.server
  if (isServer && !req) return
  const auth = isServer ? getAuthFromCookie(req) : getAuthFromLocalStorage()
  store.commit('merge', ['base.auth', auth])
}
