<template lang="pug">
v-dialog(v-model="visible" persistent scrollable width="auto")
  no-ssr
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
                v-flex.pl-4(xs7)
                  v-text-field(
                    :maxlength="titleMaxlength"
                    type="text"
                    v-model="title"
                    name="event-title"
                    :label="$t('attr.event-title')"
                    v-validate="titles.length > 0 ? '' : 'required'"
                    :error-messages="veeErrors.first('event-title') || []"
                  )
                v-flex.pl-4(xs2)
                  v-btn.primary(
                    :disabled="section && title ? false : true"
                    @click.stop.prevent.native="addSectionTitle()"
                  )
                    span {{ $t('base.form.add') }}
                  div.mt-1(class="errorColor" v-if="!isTitleAdded")
                    | {{ $t('events.dialog.errors.title') }}

            v-flex(xs12 v-for="(title, index) in titles" :key="index")
              v-layout(row)
                v-flex(xs2) {{ title.section }}
                v-flex(xs9) {{ title.title }}
                v-flex(xs1)
                  v-btn(small icon flat @click.stop.prevent.native="removeSectionTitle(title.section)")
                    v-icon close
            
            v-flex(xs12 md3)
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
            
            v-flex.pl-4(xs12 md9)
              div(class="input-group__input")
                gmap-autocomplete(
                  id="gmap-location"
                  @place_changed="setPlace"
                  :select-first-on-enter="true"
                  :placeholder="$t('attr.event-location')"
                  :value="locationJp"
                  style="width: 100%"
                )
              div.mt-1(class="errorColor" v-if="!isLocationAutocompleted")
                | {{ $t('events.dialog.errors.location') }}

            v-flex(xs12 class="gmap-section")
              gmap-map(
                :center="gmap['center']"
                :zoom="gmap['zoom']"
                :options="gmap['options']"
                style="height: 200px")
                gmap-marker(
                  v-for="(marker, index) in gmap['markers']"
                  :key="index"
                  :icon="gmap['icon']"
                  :position="marker.position")

            v-flex(xs12)
              v-text-field(
                type="text"
                v-model="accessJp"
                name="event-access-jp"
                :label="$t('attr.event-access-jp')"
                v-validate="'required'"
                :error-messages="veeErrors.first('event-access-jp') || []"
                prepend-icon="business"
                @keypress.enter.native="send()"
              )

            v-flex(xs12)
              v-text-field(
                type="text"
                v-model="accessEn"
                name="event-access-en"
                :label="$t('attr.event-access-en')"
                v-validate="'required'"
                :error-messages="veeErrors.first('event-access-en') || []"
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
            
            v-flex.pl-4(xs12 md6)
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
            
            v-flex.pl-4(xs12 md6)
              v-select(
                :items="capacityItems"
                v-model="capacity"
                name="event-capacity"
                :label="$t('attr.event-capacity')"
                v-validate="'required'"
                :error-messages="veeErrors.first('event-capacity') || []"
                prepend-icon="people_outline"
                @change="setThresholdItems()"
              )
            
            v-flex(xs12 md6)
              v-select(
                :disabled="(capacity && capacity !== 0) ? false : true"
                :items="thresholdItems"
                v-model="threshold"
                name="event-threshold"
                :label="$t('attr.event-threshold')"
                v-validate="'required'"
                :error-messages="veeErrors.first('event-threshold') || []"
                prepend-icon="hdr_weak"
              )
            
            v-flex.pl-4(xs12 md6).mt-3
              v-uploader(:setting="uploadConfig" @done="uploadDone")
              div.mt-1(class="errorColor" v-if="!isPictureUploaded")
                | {{ $t('events.dialog.errors.picture') }}

            viewer(:images="originalPictures.map(picture => picture.original)" v-if="originalPictures")
              div.sub-pictures-view.mt-2
                v-layout(row).sub-pictures
                  v-flex(
                    v-for="(picture, index) in originalPictures"
                    :key="index"
                    wrap
                    md3
                    class="sub-image mr-2"
                  )
                    v-icon.pointable(
                      v-if="originalPictures.length === 1"
                      class="icon-grey"
                    ) delete
                    v-icon.pointable(
                      v-else
                      class="icon-red"
                      @click="deletePicture(originalPictures[index].qquuid)"
                    ) delete
                    img(:src="originalPictures[index].original")

            v-flex(xs12 v-if="isSportEvent()")
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

            v-flex(xs12 md6)
              v-textarea(
                outline
                rows="13"
                v-model="explanationJp"
                name="event-explanation-jp"
                :label="$t('attr.event-explanation-jp')"
                v-validate="'required'"
                :error-messages="veeErrors.first('event-explanation-jp') || []"
                hide-details
              )

            v-flex.pl-4(xs12 md6)
              v-textarea(
                outline
                rows="13"
                v-model="explanationEn"
                name="event-explanation-en"
                :label="$t('attr.event-explanation-en')"
                v-validate="'required'"
                :error-messages="veeErrors.first('event-explanation-en') || []"
                hide-details
              )
      
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

    .sub-pictures-view
      max-width 210vh
      overflow-x auto
      overflow-y hidden

    .sub-pictures
      width p(1100, 312)

    .sub-image
      img
        width 100%
        height auto
    
    i.icon-red
      color #C62828
    
    i.icon-grey
      color #bdbdbd
</style>

<!-- ============================================================================ -->

<script>
import mixins from '~/utils/mixins'
import axios from '~/plugins/axios'
import queryString from 'query-string'
import moment from 'moment'
import constants from '~/utils/constants'

export default {
  mixins: [mixins],
  data () {
    return {
      visible: false,
      titleMaxlength: 33,
      section: null,
      sectionItems: [],
      title: null,
      titles: [],
      date: null,
      locationJp: null,
      locationForm: null,
      locationHidden: null,
      accessJp: null,
      accessEn: null,
      startTime: null,
      endTime: null,
      eventTimeItems: this.timeOptions(),
      cost: null,
      costItems: this.costOptions({ min: 0, max: 10000, step: 500 }),
      capacity: null,
      capacityItems: this.rangeOptionsForSelect(1, 60, { includeUnlimitedOption: true }),
      threshold: null,
      thresholdItems: [],
      positions: [],
      uploadConfig: {
        multiple: true,
        language: 'en',
        fileTypeExts: [
          'jpeg',
          'jpg',
          'gif',
          'png',
          'event'
        ]
      },
      explanationJp: null,
      explanationEn: null,
      allowedExtensions: '<div data-v-fb284a6e="">file size limit：<span data-v-fb284a6e="">5MB</span><br data-v-fb284a6e="">file extensions：<span data-v-fb284a6e="">jpeg,jpg,gif,png</span></div>',
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
      ],
      lat: 0,
      lng: 0,
      gmap: {
        center: {
          lat: 0,
          lng: 0
        },
        markers: [
          {
            position: {
              lat: 0,
              lng: 0
            }
          }
        ],
        zoom: constants.gmap.zoom,
        icon: {
          url: constants.gmap.markerIcon,
          size: {
            width: constants.gmap.width,
            height: constants.gmap.height,
            f: constants.gmap.pixel,
            b: constants.gmap.pixel
          },
          scaledSize: {
            width: constants.gmap.width,
            height: constants.gmap.height,
            f: constants.gmap.pixel,
            b: constants.gmap.pixel
          }
        },
        options: { fullscreenControl: false, clickableIcons: false }
      },
      isTitleAdded: true,
      isLocationAutocompleted: true,
      isPictureUploaded: true,
      currentUser: this.$store.getters.currentUser,
      pictures: [],
      originalPictures: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.visible = this.$s.dialog
      document.getElementsByClassName('info-show')[0].innerHTML = this.allowedExtensions
      window.scrollTo(0, this.$s.scroll)
      this.setForm()
    }, 1000)
  },
  computed: {
    $uploadedPictureIds () {
      return this.$store.state.pictures.index.uploadedPictureIds
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
      this.setForm()
    },
    visible (val) {
      if (val) {
        setTimeout(() => {
          document.querySelector('#events-index-dialog .event-view').scrollTop = 0
          document.body.classList.add('freeze-body')
        }, 0)
        return
      }
      this.push(this.$store, 'events.index', '/events', {
        dialog: false
      })
      document.body.classList.remove('freeze-body')
    }
  },
  methods: {
    hasAddedTitle () {
      if ((this.section && this.section.length === 0) || !this.title) return true
      this.isTitleAdded = this.titles.length >= this.titles.length + 1
    },
    hasUploadedPicture () {
      if (this.event) return true
      this.isPictureUploaded = this.$uploadedPictureIds.length >= 1
    },
    hasBeenAutocompleted () {
      this.isLocationAutocompleted = (this.locationForm && (this.locationForm === this.locationHidden))
    },
    setPlace (place) {
      this.locationForm = this.locationHidden = document.getElementById('gmap-location').value
      this.locationJp = place.formatted_address
      this.positions = [place.geometry.location.lat(), place.geometry.location.lng()]
      this.setGmapMarker(this.positions)
      this.hasBeenAutocompleted()
    },
    uploadDone (files) {
      if (files && Array.isArray(files) && files.length) {
        let uploadedPictureIds = files.map(arr => arr.qquuid)
        this.$store.commit('merge', ['pictures.index', {
          uploadedPictureIds: uploadedPictureIds
        }])
        this.hasUploadedPicture()
        if (this.event) {
          let firstPicture = files[0]
          if (firstPicture.type && firstPicture.type === 'event') {
            this.linkPicturesToEvent(uploadedPictureIds)
          }
          this.getOriginalPictures(this.event.id)
        }
      }
    },
    addSectionTitle () {
      this.titles.push({ section: this.section, title: this.title })
      this.updateSectionTitle(this.section, 'add')
      this.section = null
      this.title = null
      this.isTitleAdded = true
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
    setThresholdItems () {
      this.$nextTick(function () {
        if (this.capacity === 0 || this.capacity <= this.threshold) {
          this.threshold = null
        }
        if (this.capacity >= 1) {
          this.thresholdItems = this.rangeOptionsForSelect(
            0, this.capacity - 1, { includeUnlimitedOption: false }
          )
        }
      })
    },
    isSportEvent () {
      return this.titles.map(title => title.section).includes('SP')
    },
    send () {
      let context = this
      context.hasAddedTitle()
      context.hasBeenAutocompleted()
      context.hasUploadedPicture()
      this.locationForm = document.getElementById('gmap-location').value
      this.$validator.validateAll().then(async result => {
        if (!result ||
          !context.isTitleAdded ||
          !context.isLocationAutocompleted ||
          !context.isPictureUploaded) return
        try {
          this.openWaitingScreen({ onDialog: false })
          let newEvent = {
            user_id: this.currentUser.id,
            title: JSON.stringify(this.titles),
            date: this.date,
            location_jp: this.locationJp,
            access_jp: this.accessJp,
            access_en: this.accessEn,
            start_time: this.startTime,
            end_time: this.endTime,
            cost: this.cost,
            capacity: this.capacity,
            threshold: this.threshold,
            explanation_jp: this.explanationJp,
            explanation_en: this.explanationEn,
            picture_ids: this.$uploadedPictureIds,
            positions: this.positions,
            tags: this.isSportEvent() ? this.desiredSportTags : [],
            section: this.titles.map(title => title.section)
          }
          let res = await axios({
            ...{
              method: this.$s.eventId ? 'put' : 'post',
              url: this.$s.eventId ? `/events/${this.$s.eventId}` : '/events',
              data: {
                event: newEvent,
                locale: this.$store.state.base.locale.selected
              }
            },
            ...this.$store.getters.options
          })
          this.closeWaitingScreen()
          if (res.data.status === 'error') {
            res.data.errors.name && this.veeErrors.add('event-access', `${this.$t('attr.event-access')}${res.data.errors.access[0]}`)
            return
          }
          this.reloadList()
          this.message(this.$t('base.axios.success'))
          this.visible = false
        } catch (error) {
          this.message(this.$t('base.axios.failure'))
        }
      })
    },
    async reloadList () {
      try {
        let params = queryString.stringify({
          bom: moment().subtract(1, 'months').format('YYYY-MM-DD'),
          eom: moment().add(1, 'months').format('YYYY-MM')
        }, { arrayFormat: 'bracket' })
        let { data } = await axios.get(`/events?${params}`, this.$store.getters.options)
        this.$store.commit('merge', ['events.index', {
          events: data.data.events
        }])
        window.scrollTo(0, 0)
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          this.$router.replace(this.path('/auth/login'))
        }
      }
    },
    async linkPicturesToEvent (qquuids) {
      try {
        let params = queryString.stringify({
          qquuids: qquuids,
          picture_type: 'event',
          event_id: this.event.id
        }, { arrayFormat: 'bracket' })
        let { data } = await axios.put(`/pictures/update?${params}`, this.$store.getters.options)
        if (data.status === 'error') {
          return
        }
        this.getOriginalPictures(this.event.id)
        this.clearPreviewPicture()
        this.message(this.$t('base.axios.success'))
        window.scrollTo(0, 0)
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          this.$router.replace(this.path('/auth/login'))
        }
      }
    },
    clearPreviewPicture () {
      let qqUploadSuccess = document.getElementsByClassName('qq-upload-success')
      Array.from(qqUploadSuccess).forEach(function (uploadedPicture) {
        uploadedPicture.parentNode.removeChild(uploadedPicture)
      })
      this.$store.commit('merge', ['pictures.index', {
        uploadedPictureIds: []
      }])
    },
    async deletePicture (qquuid) {
      let confirmationText = this.$t('base.logout.confirm')
      this.confirm({ text: confirmationText })
        .then(async agreed => {
          if (agreed) {
            try {
              let { data } = await axios.post(`/pictures/delete?qquuid=${qquuid}`, this.$store.getters.options)
              if (data.status === 'error') {
                return
              }
              this.getOriginalPictures(this.event.id)
              this.message(this.$t('base.axios.success'))
            } catch (error) {
              this.message(this.$t('base.axios.failure'))
            }
          }
        })
    },
    async getOriginalPictures (eventId) {
      try {
        let params = queryString.stringify({
          id: eventId,
          picture_type: 'event'
        }, { arrayFormat: 'bracket' })
        let { data } = await axios.get(`/pictures/show?${params}`, this.$store.getters.options)
        if (data.status === 'error') {
          return
        }
        this.originalPictures = data.data.pictures
      } catch (error) {
        this.message(this.$t('base.axios.failure'))
      }
    },
    setForm () {
      let context = this
      this.veeErrors.clear()
      this.clearPreviewPicture()
      this.sectionItems = [
        { text: 'SC', value: 'SC' },
        { text: 'LX', value: 'LX' },
        { text: 'SP', value: 'SP' }
      ]
      if (this.event) {
        this.titles = []
        JSON.parse(this.event.title).forEach(function (titleItem) {
          context.updateSectionTitle(titleItem.section, 'add')
          context.titles.push({ section: titleItem.section, title: titleItem.title })
        })
        this.date = this.event.date
        this.locationJp = this.locationForm = this.locationHidden = this.event.locationJp
        this.accessJp = this.event.accessJp
        this.accessEn = this.event.accessEn
        this.startTime = this.event.startTime
        this.endTime = this.event.endTime
        this.cost = this.event.cost
        this.capacity = this.event.capacity
        this.setThresholdItems()
        this.explanationJp = this.event.explanationJp
        this.explanationEn = this.event.explanationEn
        this.positions = this.event.positions
        this.desiredSportTags = this.event.tags
        this.section = this.event.section
        this.isLocationAutocompleted = true
        this.isPictureUploaded = true
        this.getOriginalPictures(this.event.id)
        setTimeout(() => {
          this.threshold = this.event.threshold
        }, 500)
      } else {
        this.title = null
        this.titles = []
        this.date = null
        this.locationJp = null
        this.accessJp = null
        this.accessEn = null
        this.startTime = null
        this.endTime = null
        this.cost = null
        this.capacity = null
        this.threshold = null
        this.explanationJp = null
        this.explanationEn = null
        this.positions = constants.gmap.positions.osaka
        this.desiredSportTags = []
        this.section = []
        this.isLocationAutocompleted = true
        this.isPictureUploaded = true
        this.$store.commit('merge', ['pictures.index', {
          uploadedPictureIds: []
        }])
        this.originalPictures = []
      }
      this.setGmapMarker(this.positions)
    },
    cancel () {
      this.visible = false
    }
  }
}
</script>