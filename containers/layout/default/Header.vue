<template lang="pug">
v-app#layout-default-header
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

      v-list-group(v-for="item in expensionList" v-bind:key="item.title")
        v-list-tile(slot="item" @click="")
          v-list-tile-action
            v-icon people
          v-list-tile-content
            v-list-tile-title.f-fw2 {{ $t(item.title) }}
          v-list-tile-action
            v-icon keyboard_arrow_down
        v-list-tile(
          v-for="subItem in item.subItems"
          :key="subItem.subTitleKey"
          ripple
          @click="goto($router, subItem.href)"
        )
          v-list-tile-title.f-fw2 {{ $t(subItem.subTitleKey) }}

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

  v-toolbar(fixed class="border-blue")
    img.pointable(src="/images/logo/original.png" height="100%" @click="goto($router, '/')")
    v-spacer
    v-toolbar-items.half-scaled
      v-btn(flat nuxt ripple :to="`/en${fullPath}`")
        img.pointable(
          src="/images/sns/fb.png"
          width="48"
          height="48"
        )
      v-btn.border-grey(flat v-if="$store.state.base.locale.selected === 'ja'" nuxt ripple :to="`/en${fullPath}`")
        img.pointable(
          src="/images/language/128/en.png"
          width="48"
          height="48"
        )
      v-btn.border-grey(flat v-else nuxt ripple :to="fullPath.replace(/^\\/[^\/]+/, '')" exact)
        img.pointable(
          src="/images/language/128/jp.png"
          width="48"
          height="48"
        )
    v-toolbar-side-icon(@click.native.stop="drawer = !drawer")
  slot
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#layout-default-header
  .half-scaled
    transform: scale(0.5, 0.5)  translate(100px, 0px)
    -ms-transform: scale(0.5, 0.5) translate(100px, 0px)
    -webkit-transform: scale(0.5, 0.5) translate(100px, 0px)
  
  .border-grey
    border-left: 2px solid #424242
  
  .white-background
    background-color: #f5f5f5
  
  .border-blue
    border-top: 5px solid #1a237e
  
  .pointable
    cursor pointer
  
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
export default {
  mixins: [mixins],
  data () {
    return {
      expensionList: [
        { action: 'team',
          title: 'top.team.title',
          subItems: [
            { subTitleKey: 'top.team.sub.i01', href: '/team/login', visible: true },
            { subTitleKey: 'top.team.sub.i02', href: '/team/registration', visible: true }
          ]
        }
      ],
      items: [
        { titleKey: 'top.index.title', icon: 'dashboard', href: '/', visible: true },
        { titleKey: 'top.event.title', icon: 'event', href: '/event', visible: true },
        { titleKey: 'top.secret.title', icon: 'vpn_key', href: '/top/secret', visible: true }
      ],
      drawer: false
    }
  },
  computed: {
    fullPath () {
      return this.$store.state.base.layout.fullPath
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
    s () {
      console.log('ss')
    }
  }
}
</script>
