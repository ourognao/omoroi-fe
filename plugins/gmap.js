import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC7qTSt5ktqvRBOY_615b6eBvlpBCtX4kk',
    libraries: 'places'
  }
})
