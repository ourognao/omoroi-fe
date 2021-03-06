<template lang="pug">
#layout-default-header
  v-navigation-drawer(app temporary right v-model="drawer" width="210").primary
    v-list.f-pa0
      v-list-tile(avatar tag="div")
        v-list-tile-avatar.avatar-omoroi
          img(src="/images/logo/simplified.jpg").l-logo.img
        v-list-tile-content
          v-list-tile-title.l-logo.title.white--text {{ $t('base.head.title') }}
        v-list-tile-action
          v-btn(icon @click.native.stop="drawer = false")
            v-icon.white--text close

    v-list.f-pt0(dense)
      
      v-divider(color="white")
      
      v-list-tile.l-list-tile.white--text(
        v-for="link in firstPartLinks"
        :key="link.titleKey"
        v-if="link.visible"
        ripple
        @click.stop.prevent.native="link.externalHref ? externalGoTo(link.href) : goto($router, setHref(link.href))"
        active-class="l-active"
        v-model="selected[link.name]"
      )
        v-list-tile-action
          v-icon.white--text {{ link.icon }}
        v-list-tile-content
          v-list-tile-title.f-fw2 {{ $t(link.titleKey) }}
      
      v-list-tile.white--text(
        key="100"
        v-if="$store.state.base.locale.selected === 'ja'"
        nuxt
        ripple
        :to="`/en${fullPath}`"
        exact
      )
        v-list-tile-action
          v-icon.white--text public
        v-list-tile-content
          v-list-tile-title.f-fw2 {{ $t('base.menu.english') }}
      v-list-tile.white--text(
        key="101"
        v-else
        nuxt
        router
        ripple
        :href="fullPath.replace(/^\\/[^\/]+/, '')"
        exact
      )
        v-list-tile-action
          v-icon.white--text public
        v-list-tile-content
          v-list-tile-title.f-fw2 {{ $t('base.menu.japanese') }}

      v-list-tile.l-list-tile.white--text(
        v-for="link in secondPartLinks"
        :key="link.titleKey"
        v-if="link.visible"
        ripple
        @click.stop.prevent.native="link.externalHref ? externalGoTo(link.href) : goto($router, setHref(link.href))"
        active-class="l-active"
        v-model="selected[link.name]"
      )
        v-list-tile-action
          v-icon.white--text {{ link.icon }}
        v-list-tile-content
          v-list-tile-title.f-fw2 {{ $t(link.titleKey) }}

      v-list-tile.l-list-tile.white--text(key="102" v-if="$store.getters.isLogined" ripple @click.stop.prevent.native="signOut")
        v-list-tile-action
          v-icon.white--text directions_run
        v-list-tile-content
          v-list-tile-title.f-fw2 {{ $t('base.menu.sign_out') }}

  v-toolbar(fixed class="border-blue")
    img.pointable(src="/images/logo/original.png" height="100%" @click="goToTopPage()")
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
    img.pointable(
      v-else
      src="/images/language/128/jp.png"
      class="menu-icons"
      @click="goto($router, `${fullPath.replace(/^\\/[^\/]+/, '')}`)"
    )
    img.pointable(
      src="/images/top/menu.png"
      class="menu-icons v-toolbar-side-icon"
      @click="drawer = !drawer")
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
      v-layout#omoroiLogo(row)
        v-flex.text-xs-center.pb-2.pt-2(xs12)
          img(src="/images/logo/simplified.jpg" style="width:30%")
      v-card-text.text-xs-center.pb-0.pt-0(style="font-size:10px") {{ $store.state.base.waiting.text }}
      v-layout(row)
        v-flex(xs6 offset-xs3 offset-lg3)
          v-progress-linear(v-bind:indeterminate="true" color="blue")
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#layout-default-header
  .avatar-omoroi
    min-width 42px!important
  
  #omoroiLogo
    img
      width 50%
  
  .l-confirm
    width auto
  
  .l-confirm-btn
    width 100%
    
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
  
  .border-blue
    border-top: 5px solid #1a237e
  
  .l-logo
    &.img
      width: 75%
      height: auto
      margin-left -10px
    &.title
      font-weight 500
      font-size t(23)!important
      margin-top 2px
  
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
import axios from '~/plugins/axios'
import queryString from 'query-string'

export default {
  mixins: [mixins],
  data () {
    return {
      currentUser: this.$store.getters.currentUser,
      manuallyClearSession: false,
      firstPartLinks: [
        {
          titleKey: 'top.index.title',
          icon: 'home',
          href: '/',
          visible: true,
          externalHref: false
        },
        {
          titleKey: 'auth.login.title',
          icon: 'input',
          href: '/auth/login',
          visible: !this.$store.getters.isLogined,
          externalHref: false
        },
        {
          titleKey: 'auth.sign-up.title',
          icon: 'person_add',
          href: '/auth/sign-up',
          visible: !this.$store.getters.isLogined,
          externalHref: false
        },
        {
          titleKey: 'events.index.title',
          icon: 'event',
          href: '/events',
          visible: this.$store.getters.isLogined && this.$store.getters.screenRightsFor('events'),
          externalHref: false
        }
      ],
      secondPartLinks: [
        {
          titleKey: 'base.menu.facebook-event-photos',
          icon: 'photo_camera',
          href: 'http://www.facebook.com/pg/omoroilife/photos',
          visible: true,
          externalHref: true
        },
        {
          titleKey: 'about-and-contact-us.index.title',
          icon: 'library_books',
          href: '/about',
          visible: true,
          externalHref: false
        }
      ],
      drawer: false,
      goToTopPageItems: [
        { locale: 'ja', patterns: ['/', '/?', '/t'], subStrMaxlength: 2 },
        { locale: 'en', patterns: ['/en/', '/en/?'], subStrMaxlength: 5 }
      ]
    }
  },
  computed: {
    sports: {
      get: function () { return this.$s.sports },
      set: function (val) { this.$store.commit('merge', ['top.index', { sports: val }]) }
    },
    eventSection: {
      get: function () { return this.$topIndex.section },
      set: function (val) { this.$store.commit('merge', ['top.index', { section: val }]) }
    },
    uprovider () {
      return this.$store.state.base.auth.uprovider
    },
    $topIndex () {
      return this.$store.state.top.index
    },
    fullPath () {
      return this.$store.state.base.layout.fullPath
    },
    currentLanguage () {
      return this.$store.state.base.locale.selected
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
  watch: {
    uprovider (val) {
      if (!val) {
        this.invalidOmniauthSession()
      }
    }
  },
  methods: {
    setHref (href) {
      let language = this.$locale === 'en' ? '/en' : ''
      if (href === '/') {
        this.goToTopPage()
      }
      return `${language}${href}`
    },
    goToTopPage () {
      let goToTopPageItem = this.goToTopPageItems.filter(item => item.locale === this.$locale)[0]
      if (goToTopPageItem.patterns.includes(this.fullPath) ||
        goToTopPageItem.patterns.includes(this.fullPath.substr(0, goToTopPageItem.subStrMaxlength))) {
        window.location.reload()
      } else {
        this.goto(this.$router, this.$locale === 'en' ? '/en' : '/')
      }
    },
    async invalidOmniauthSession () {
      this.clearUserTokenSession()
      try {
        let params = queryString.stringify({
          email: this.currentUser.email
        }, { arrayFormat: 'bracket' })
        let hrefPath = this.manuallyClearSession === false
          ? '/auth/login?session=expired'
          : '/auth/login'
        await axios.get(`/users/invalid_omniauth_session?${params}`)
        window.location.href = this.redirectWithLocale(hrefPath)
      } catch (error) {
        this.message(this.$t('base.axios.failure'))
        console.error(error)
      }
    },
    signOut (e) {
      let confirmationText = this.$t('base.logout.confirm')
      this.confirm({ text: confirmationText, onDialog: true })
        .then(async agreed => {
          if (agreed) {
            try {
              this.manuallyClearSession = true
              this.clearUserTokenSession()
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
