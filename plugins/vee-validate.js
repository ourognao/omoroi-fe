import Vue from 'vue'
import VeeValidate from 'vee-validate'

import messageJa from 'vee-validate/dist/locale/ja'
import messageEn from 'vee-validate/dist/locale/en'
messageJa.attributes = require('json-loader!yaml-loader!~/assets/locales/ja.yaml').attr
messageEn.attributes = require('json-loader!yaml-loader!~/assets/locales/en.yaml').attr
VeeValidate.Validator.localize('ja', messageJa)
VeeValidate.Validator.localize('en', messageEn)
Vue.use(VeeValidate, { errorBagName: 'veeErrors', events: '' })

export default ({ app, store, params }) => {
  app.validator = VeeValidate.Validator
  app.validator.localize(store.state.base.locale.selected)
}
