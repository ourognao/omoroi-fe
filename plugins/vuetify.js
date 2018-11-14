import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.darken4,
    secondary: colors.grey.darken2,
    accent: colors.indigo.accent4,
    error: colors.pink.base,
    success: colors.lightBlue.darken2,
    info: colors.blue.darken3,
    warning: colors.orange.darken4
  }
})
