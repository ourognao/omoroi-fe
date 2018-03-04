<template lang="pug">
v-app
  layout-default-header
    layout-default-main
  layout-default-footer
</template>

<!-- ============================================================================ -->

<script>
import LayoutDefaultHeader from '~/containers/layout/default/Header'
import LayoutDefaultMain from '~/containers/layout/default/Main'
import LayoutDefaultFooter from '~/containers/layout/default/Footer'

export default {
  components: {
    LayoutDefaultHeader,
    LayoutDefaultMain,
    LayoutDefaultFooter
  }
}
</script>
