import Cookie from 'js-cookie'

export const getAuthFromCookie = (req) => {
  if (!req.headers.cookie) return
  const authCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('auth='))
  if (!authCookie) return
  const authJson = authCookie.split('=')[1]
  return authJson ? JSON.parse(decodeURIComponent(authJson)) : undefined
}

export const getAuthFromLocalStorage = () => {
  const authJson = window.localStorage.auth
  return authJson ? JSON.parse(authJson) : undefined
}

export const setToken = (auth, remember) => {
  if (process.SERVER_BUILD) return
  let authJson = JSON.stringify(auth)
  window.localStorage.setItem('auth', authJson)
  Cookie.set('auth', authJson, { expires: remember ? 3650 : 0 })
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('auth')
  Cookie.remove('auth')
  window.localStorage.setItem('logout', Date.now())
}
