<template lang="pug">
#layout-default-header
  v-navigation-drawer(
    right
    temporary
    v-model="drawer"
  )
    v-list.f-pa0
      v-list-tile(avatar tag="div")
        v-list-tile-avatar
          img(src="/images/logo/simplified.jpg")
        v-list-tile-content
          v-list-tile-title.l-logo.grey--text {{ $t('base.head.title') }}
        v-list-tile-action
          v-btn(icon @click.native.stop="drawer = false")
            v-icon close

    v-list.f-pt0(dense)
      v-divider
      v-list-tile.l-list-tile(
        v-for="item in items"
        :key="item.titleKey"
        v-if="item.visible"
        ripple
        @click.stop.prevent.native="goto($router, item.href)"
        active-class="l-active"
        v-model="selected[item.name]"
      )
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title.f-fw2 {{ $t(item.titleKey) }}

      v-list-tile(
        key="100"
        v-if="$store.state.base.locale.selected === 'ja'"
        nuxt
        ripple
        :to="`/en${fullPath}`"
        exact
      )
        v-list-tile-action
          v-icon public
        v-list-tile-content
          v-list-tile-title.f-fw2 {{ $t('base.menu.english') }}

      v-list-tile(
        key="101"
        v-else
        nuxt
        router
        ripple
        :href="fullPath.replace(/^\\/[^\/]+/, '')"
        exact
      )
        v-list-tile-action
          v-icon public
        v-list-tile-content
          v-list-tile-title.f-fw2 {{ $t('base.menu.japanese') }}

      v-list-tile.l-list-tile(key="102" v-if="$store.getters.isLogined" ripple @click.stop.prevent.native="signOut")
        v-list-tile-action
          v-icon directions_run
        v-list-tile-content
          v-list-tile-title.f-fw2 {{ $t('base.menu.sign_out') }}

  v-toolbar(fixed class="border-blue")
    img.pointable(src="/images/logo/original.png" height="100%" @click="goto($router, '/')")
    v-spacer
    a(href="https://www.instagram.com/omoroilife" target="_blank")
      img.pointable(src="/images/sns/instagram.png" class="menu-icons mt-1")
    a(href="https://facebook.com/omoroilife" target="_blank")
      img.pointable(src="/images/sns/facebook.png" class="menu-icons border-grey mt-1")
    img.pointable(
      v-if="$store.state.base.locale.selected === 'ja'"
      src="/images/language/128/en.png"
      class="menu-icons"
      @click="goto($router, `/en${fullPath}`)"
    )
    a(v-else :href="fullPath.replace(/^\\/[^\/]+/, '')")
      img.pointable(
        src="/images/language/128/jp.png"
        class="menu-icons"
      )
    img.pointable(src="/images/top/menu.png" class="menu-icons v-toolbar-side-icon" @click="drawer = !drawer")
  slot

  v-snackbar(top right vertical v-model="snackbarVisible")
    span {{ $store.state.base.snackbar.message }}
    v-btn(flat dark @click.prevent.stop.native="closeSnackbar()") {{ $t('base.form.close') }}

  v-dialog(v-model="confirmVisible" persistent content-class="l-confirm")
    v-card
      v-card-title.headline(v-if="$store.state.base.confirm.title") {{ $store.state.base.confirm.title }}
      v-card-text.pt-0.pb-3 {{ $store.state.base.confirm.text }}
      v-divider
      v-card-actions
        v-container.pa-0(fluid)
          v-layout(wrap)
            v-flex(xs6)
              v-btn.ma-0.grey--text.darken-1.l-confirm-btn(flat @click.stop.native="closeConfirm(false)" style="width:100%")
                v-icon remove_circle_outline
                span.ml-1 {{ $t('base.confirm.disagree') }}
            v-flex(xs6)
              v-btn.ma-0.grey--text.darken-1.l-confirm-btn(flat @click.stop.native="closeConfirm(true)" style="width:100%")
                v-icon check_circle
                span.ml-1 {{ $t('base.confirm.agree') }}

  v-dialog(v-model="waitingVisible" persistent content-class="l-waiting")
    v-card
      v-layout(row)
        v-flex.text-xs-center.pa-3(xs12)
          img(src="/images/logo/simplified.jpg" style="width:100%")
      v-card-text.text-xs-center.title {{ $store.state.base.waiting.text }}
      v-layout(row)
        v-flex(xs6 offset-xs3 offset-lg3)
          v-progress-linear(v-bind:indeterminate="true" color="blue")
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#layout-default-header
  .menu-icons
    height: 26px
    width: 26px
    margin-left: 5px
  
  .half-scaled
    transform: scale(0.5, 0.5)  translate(100px, 0px)
    -ms-transform: scale(0.5, 0.5) translate(100px, 0px)
    -webkit-transform: scale(0.5, 0.5) translate(100px, 0px)

  .border-grey
    border-right: 2px solid #424242
    margin-right: 1px
    padding-right: 5px
    width: 32px
  
  .white-background
    background-color: #f5f5f5
  
  .border-blue
    border-top: 5px solid #1a237e
  
  .l-logo
    font-weight 600
    font-size t(28)
  
  .l-list-tile
    cursor pointer
    &:hover
      background-color rgba(0, 0, 0, .12)
  
  .l-active
    background-color #eee
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import { unsetToken } from '~/utils/auth'

export default {
  mixins: [mixins],
  data () {
    return {
      items: [
        { titleKey: 'top.index.title', icon: 'dashboard', href: '/', visible: true },
        { titleKey: 'auth.login.title', icon: 'input', href: '/auth/login', visible: !this.$store.getters.isLogined },
        { titleKey: 'auth.sign-up.title', icon: 'person_add', href: '/auth/sign-up', visible: !this.$store.getters.isLogined },
        { titleKey: 'events.index.title', icon: 'event', href: '/events', visible: this.$store.getters.currentUser.kind !== 'customer' }
      ],
      drawer: false
    }
  },
  computed: {
    fullPath () {
      return this.$store.state.base.layout.fullPath
    },
    snackbarVisible: {
      get () {
        return this.$store.state.base.snackbar.visible
      },
      set (val) {
        this.$store.commit('merge', ['base.snackbar', {
          visible: val
        }])
      }
    },
    waitingVisible: {
      get () {
        return this.$store.state.base.waiting.visible
      },
      set (val) {
        this.$store.commit('merge', ['base.waiting', {
          visible: val
        }])
      }
    },
    confirmVisible: {
      get () {
        return this.$store.state.base.confirm.visible
      },
      set (val) {
        this.$store.commit('merge', ['base.confirm', {
          visible: val
        }])
      }
    },
    selected: {
      get () {
        let menus = {
          'index': false,
          'top-secret': false,
          'users': false,
          'auth-update': false
        }
        menus[this.$route.name] = true
        return menus
      }
    }
  },
  methods: {
    signOut (e) {
      let confirmationText = this.$t('base.logout.confirm')
      this.confirm({ text: confirmationText })
        .then(async agreed => {
          if (agreed) {
            try {
              unsetToken()
              this.$store.commit('merge', ['base.auth', {
                token: null,
                uid: null,
                client: null,
                email: null,
                name: null,
                kind: null
              }])
              this.reload()
            } catch (error) {
              this.message(this.$t('base.axios.failure'))
              console.error(error)
            }
          }
        })
    },
    closeSnackbar (e) {
      this.snackbarVisible = false
    },
    closeConfirm (agree) {
      agree && this.$store.state.base.confirm.agreed()
      !agree && this.$store.state.base.confirm.disagreed()
      this.confirmVisible = false
    }
  }
}
</script>
