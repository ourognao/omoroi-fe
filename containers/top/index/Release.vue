<template lang="pug">
v-container#top-index-release(fluid)
  v-layout(row wrap justify-center)
    div(class="hidden-sm-and-down")
      v-flex(xs12).display-3.font-weight-bold {{ $t('top.release.explanation.i01') }}
      v-flex(xs12).display-3.font-weight-bold {{ $t('top.release.explanation.i02') }}
    div(class="hidden-md-only hidden-lg-only hidden-xl-only")
      v-flex(xs12).title.font-weight-medium {{ $t('top.release.explanation.i01') }}
      v-flex(xs12).subheading.font-weight-medium {{ $t('top.release.explanation.i02') }}
  v-layout(row wrap justify-center)
    v-flex(xs12 md4)
      v-card.form.mt-3
        v-card-title.pb-0 {{ $t('top.release.form.title') }}
        v-card-text.pt-0
          v-layout(row wrap)
            v-flex(xs7)
              v-text-field(
                type="text"
                v-model="email"
                name="user-email"
                :label="$t('attr.user-email')"
                v-validate="'required|email'"
                :error-messages="veeErrors.first('user-email') || []"
                prepend-icon="mail"
                @keypress.enter.native="send"
              )
            v-flex(xs4 offset-xs1)
              v-btn.mt-3(small round color="primary" dark @click.stop.prevent.native="send")
                span {{ $t('base.form.send') }}
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#top-index-release
  height 100vh
  background-image url(/images/top/release-bg.jpg)
  background-repeat no-repeat
  background-attachment fixed
  background-size auto 100%
  .form
    width 100%
    
    
</style>

<!-- ============================================================================ -->

<script>
import axios from '~/plugins/axios'
import mixins from '~/utils/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      email: null
    }
  },
  mounted () {
    document.body.classList.add('freeze-body')
  },
  methods: {
    send () {
      this.$validator.validateAll().then(async result => {
        try {
          if (!result) return
          await axios.post('/utils/release_email', {
            email: this.email,
            locale: this.$store.state.base.locale.selected
          }).then(response => {
            let { data } = response
            if (data.status === 'error') {
              this.$validator.errors.add({
                field: 'user-email',
                msg: `${this.$t('attr.user-email')}${data.errors.email[0]}`
              })
              return
            }
            this.message(this.$t('top.release.form.success-registration'))
            this.email = null
          }).catch(error => {
            console.error(error)
          })
        } catch (error) {
          console.error(error)
        }
      })
    }
  }
}
</script>
