<template lang="pug">
v-dialog(v-model="visible" persistent scrollable width="auto")
  v-card#events-index-dialog
    v-card-title.grey.lighten-5
      v-icon edit
      span {{ $s.eventId ? $t('events.dialog.title.edit') : $t('events.dialog.title.new') }}
      v-spacer
      v-btn(small icon flat @click.stop.prevent.native="cancel")
        v-icon close

    v-divider
    
    v-card-text.event-view
      v-container.pa-0(fluid)
        v-layout.pa-1(wrap align-center)
          v-flex(xs12 v-if="sectionItems.length > 0")
            v-layout(row)
              v-flex(xs3)
                 v-select(
                  :items="sectionItems"
                  v-model="section"
                  name="event-section"
                  :label="$t('attr.event-section')"
                  v-validate="titles.length > 0 ? '' : 'required'"
                  :error-messages="veeErrors.first('event-section') || []"
                  prepend-icon="hdr_weak"
                )
              v-flex(xs7)
                v-text-field(
                  type="text"
                  v-model="title"
                  name="event-title"
                  :label="$t('attr.event-title')"
                  v-validate="titles.length > 0 ? '' : 'required'"
                  :error-messages="veeErrors.first('event-title') || []"
                )
              v-flex(xs2)
                v-btn.primary(
                  :disabled="section && title ? false : true"
                  @click.stop.prevent.native="addSectionTitle()"
                )
                  span {{ $t('base.form.add') }}

          v-flex(xs12 v-for="(title, index) in titles" :key="index")
            v-layout(row)
              v-flex(xs2) {{ title.section }}
              v-flex(xs9) {{ title.title }}
              v-flex(xs1)
                v-btn(small icon flat @click.stop.prevent.native="removeSectionTitle(title.section)")
                  v-icon close
          
          v-flex(xs12 md6)
            v-menu(
              lazy
              :close-on-content-click="true"
              transition="scale-transition"
              offset-y full-width
              max-width="290px"
              min-width="290px"
            )
              v-text-field(
                slot="activator"
                :label="$t('attr.event-date')"
                name="event-date"
                v-model="date"
                prepend-icon="event"
                v-validate="'required'"
                :error-messages="veeErrors.first('event-date') || []"
                readonly
              )
              v-date-picker(v-model="date" no-title scrollable actions)
          
          v-flex(xs12 md6)
            v-text-field(
              type="text"
              v-model="access"
              name="event-access"
              :label="$t('attr.event-access')"
              v-validate="'required'"
              :error-messages="veeErrors.first('event-access') || []"
              prepend-icon="business"
              @keypress.enter.native="send()"
            )
          
          v-flex(xs12 md6)
            v-select(
              :items="eventTimeItems"
              v-model="startTime"
              name="event-start-time"
              :label="$t('attr.event-start-time')"
              v-validate="'required'"
              :error-messages="veeErrors.collect('event-start-time')"
              prepend-icon="access_time"
            )
          
          v-flex(xs12 md6)
            v-select(
              :items="eventTimeItems"
              v-model="endTime"
              name="event-end-time"
              :label="$t('attr.event-end-time')"
              v-validate="'required'"
              :error-messages="veeErrors.first('event-end-time') || []"
              prepend-icon="access_time"
            )
          
          v-flex(xs12 md6)
            v-select(
              :items="costItems"
              v-model="cost"
              name="event-cost"
              :label="$t('attr.event-cost')"
              v-validate="'required'"
              :error-messages="veeErrors.first('event-cost') || []"
              prepend-icon="attach_money"
            )
          
          v-flex(xs12 md6)
            v-select(
              :items="capacityItems"
              v-model="capacity"
              name="event-capacity"
              :label="$t('attr.event-capacity')"
              v-validate="'required'"
              :error-messages="veeErrors.first('event-capacity') || []"
              prepend-icon="people_outline"
              @change="setthresholdItems()"
            )
          
          v-flex(xs12 md6)
            v-select(
              :disabled="capacity ? false : true"
              :items="thresholdItems"
              v-model="threshold"
              name="event-threshold"
              :label="$t('attr.event-threshold')"
              v-validate="'required'"
              :error-messages="veeErrors.first('event-threshold') || []"
              prepend-icon="hdr_weak"
            )
          
          v-flex(xs12 v-if="titles.map(title => title.section).includes('SP')")
            div.subheading {{ $t('labels.event.tags') }}
            div(class="errorColor" v-show="veeErrors.has('event-sport-tags')")
              | {{ veeErrors.first('event-sport-tags') }}
            v-layout(row wrap)
              v-flex(xs12 md3 v-for="(tag, index) in sportTags" :key="tag.value")
                v-checkbox(
                  :label="tag.text"
                  v-model="desiredSportTags"
                  v-validate="'required'"
                  :value="tag.value"
                  name="event-sport-tags"
                  hide-details
                )
          
          v-flex(xs12)
            v-text-field(
              textarea
              v-model="explanation"
              name="event-explanation"
              :label="$t('attr.event-explanation')"
              v-validate="'required'"
              :error-messages="veeErrors.first('event-explanation') || []"
              hide-details
            )

          v-flex(xs12)
            v-uploader(:setting="uploadConfig" @done="uploadDone")
    
    v-divider

    v-card-actions.grey.lighten-5
      v-btn(flat primary @click.stop.prevent.native="cancel")
        v-icon.ml-1 play_for_work
        span {{ $t('base.form.close') }}

      v-spacer

      v-btn(flat @click.stop.prevent.native="send()")
        span {{ $t('base.form.send') }}
        v-icon.ml-1 check_circle
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#events-index-dialog
  .event-view
    max-height 70vh
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
      section: null,
      sectionItems: [
        { text: 'SC', value: 'SC' },
        { text: 'LX', value: 'LX' },
        { text: 'SP', value: 'SP' }
      ],
      title: null,
      titles: [],
      date: null,
      access: null,
      startTime: null,
      endTime: null,
      eventTimeItems: this.timeOptions(),
      cost: null,
      costItems: this.costOptions({ min: 0, max: 10000, step: 500 }),
      capacity: null,
      capacityItems: this.rangeOptionsForSelect(0, 20),
      threshold: null,
      thresholdItems: [],
      uploadConfig: {
        multiple: true,
        language: 'en',
        fileTypeExts: [
          'jpeg',
          'jpg',
          'gif',
          'png',
          ['event', 129]
        ]
      },
      explanation: null,
      desiredSportTags: [],
      sportTags: [
        { text: this.$t('labels.sports.volleyball'), value: 'volleyball' },
        { text: this.$t('labels.sports.kickboxing'), value: 'kickboxing' },
        { text: this.$t('labels.sports.basketball'), value: 'basketball' },
        { text: this.$t('labels.sports.pingpong'), value: 'pingpong' },
        { text: this.$t('labels.sports.badminton'), value: 'badminton' },
        { text: this.$t('labels.sports.futsal'), value: 'futsal' },
        { text: this.$t('labels.sports.tennis'), value: 'tennis' },
        { text: this.$t('labels.sports.other'), value: 'other' }
      ]
    }
  },
  mounted () {
    this.setForm()
    setTimeout(() => {
      this.visible = this.$s.dialog
      window.scrollTo(0, this.$s.scroll)
    }, 500)
  },
  computed: {
    $uploadedPictureIds () {
      return this.$store.state.picture.index.uploadedPictureIds
    },
    $s () {
      return this.$store.state.events.index
    },
    dialog () {
      return this.$s.dialog
    },
    event () {
      if (this.$s.eventId) {
        let events = this.$s.events.filter((elem) => {
          return (elem.id === parseInt(this.$s.eventId))
        })
        if (!events.length) return
        return events[0]
      }
    }
  },
  watch: {
    dialog (val) {
      if (!val) return
      this.visible = true
    },
    visible (val) {
      if (val) {
        setTimeout(() => {
          document.querySelector('#events-index-dialog .event-view').scrollTop = 0
        }, 0)
        return
      }
      this.push(this.$store, 'events.index', '/events', {
        dialog: false
      })
    }
  },
  methods: {
    uploadDone (files) {
      if (files && Array.isArray(files) && files.length) {
        let uploadedPictureIds = files.map(arr => arr.id)
        this.$store.commit('merge', ['picture.index', {
          uploadedPictureIds: uploadedPictureIds
        }])
      }
    },
    addSectionTitle () {
      this.titles.push({ section: this.section, title: this.title })
      this.updateSectionTitle(this.section, 'add')
      this.section = null
      this.title = null
    },
    removeSectionTitle (section) {
      let index = this.titles.findIndex(titleItem => titleItem.section === section)
      this.titles.splice(index, 1)
      this.updateSectionTitle(section, 'remove')
    },
    updateSectionTitle (section, action) {
      if (action === 'remove') {
        this.sectionItems.push({ text: section, value: section })
        return
      }
      let index = this.sectionItems.findIndex(sectionItem => sectionItem.value === section)
      this.sectionItems.splice(index, 1)
    },
    setthresholdItems () {
      this.$nextTick(function () {
        this.thresholdItems = this.rangeOptionsForSelect(0, this.capacity - 1)
      })
    },
    send () {
      this.$validator.validateAll().then(async result => {
        if (!result) return
        try {
          let newEvent = {
            access: this.access
          }
          let res = await axios({
            ...{
              method: this.$s.eventId ? 'put' : 'post',
              url: this.$s.eventId ? `/events/${this.$s.eventId}` : '/events',
              data: {
                user: newEvent,
                locale: this.$store.state.base.locale.selected
              }
            },
            ...this.$store.getters.options
          })

          if (res.data.status === 'error') {
            res.data.errors.name && this.veeErrors.add('event-access', `${this.$t('attr.event-access')}${res.data.errors.access[0]}`)
            return
          }

          let { data } = await axios.get(`/events`, this.$store.getters.options)
          console.log(data)
          this.$store.commit('update', ['events.index', {
            events: data.data.events
          }])

          this.message(this.$t('base.form.axios.success'))
          this.visible = false
        } catch (error) {
          this.message(this.$t('base.form.axios.error'))
          console.error(error)
        }
      })
    },
    setForm () {
      this.veeErrors.clear()
      if (this.event) {
        this.access = this.event.access
        this.startTime = this.event.startTime
        this.endTime = this.event.endTime
      } else {
        this.access = null
        this.startTime = null
        this.endTime = null
      }
    },
    cancel () {
      this.visible = false
    }
  }
}
</script>