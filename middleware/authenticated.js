export default function ({ store, redirect }) {
  if (!store.getters.isLogined) {
    return redirect('/auth/login')
  }
}
