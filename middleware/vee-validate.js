import VeeValidate from 'vee-validate'

export default ({ app, store, params }) => {
  const locale = params.locale || 'ja'
  app.validator = VeeValidate.Validator
  app.validator.localize(locale)
}
