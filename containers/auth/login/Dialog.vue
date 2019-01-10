<template lang="pug">
v-dialog(v-model="visible" scrollable width="auto")
  v-card#login-dialog
    v-card-title.grey.lighten-5
      v-icon.f-mr1 refresh
      span {{ $t('auth.login.i05') }}

    v-divider

    v-card-text.f-px4.f-py3
      v-layout
        v-flex(xs12)
          v-text-field.p-email(
            type="email"
            v-model="email"
            name="user-email"
            :label="$t('attr.user-email')"
            prepend-icon="email"
            v-validate="'required|email'"
            :error-messages="veeErrors.first('user-email') || []"
            @keypress.enter.native="send"
          )

    v-divider

    v-card-actions.grey.lighten-5
      v-btn(flat @click.stop.prevent.native="cancel")
        v-icon.f-mr1 play_for_work
        span {{ $t('auth.login.i07') }}

      v-spacer

      v-btn(flat @click.stop.prevent.native="send")
        span {{ $t('auth.login.i06') }}
        v-icon.f-ml1 check_circle
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#login-dialog
  .p-email
    width p(470, 210)
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import axios from '~/plugins/axios'

export default {
  mixins: [mixins],
  data () {
    return {
      visible: false,
      email: ''
    }
  },
  computed: {
    $s () {
      return this.$store.state.auth.login
    },
    dialog () {
      return this.$s.dialog
    }
  },
  watch: {
    dialog (val) {
      if (!val) return
      this.setForm()
      this.visible = true
    },
    visible (val) {
      if (val) return
      this.push(this.$store, 'auth.login', '/auth/login', {
        dialog: false
      })
    }
  },
  mounted () {
    this.setForm()
    setTimeout(() => {
      this.visible = this.$s.dialog
    }, 500)
  },
  methods: {
    setForm () {
      this.veeErrors.clear()
    },
    cancel (e) {
      this.visible = false
    },
    send (e) {
      this.$validator.validateAll().then(async result => {
        if (!result) return
        try {
          await axios.post(`${process.env.baseUrl}/auth/password`, {
            email: this.email,
            redirect_url: `${window.location.origin}/auth/password`,
            locale: this.$store.state.base.locale.selected
          })

          this.message(this.$t('auth.login.i08'))
          this.visible = false
        } catch (error) {
          this.$validator.errors.add({
            field: 'user-email',
            msg: error.response.data.errors[0]
          })
          console.error(error)
        }
      })
    }
  }
}
</script>
