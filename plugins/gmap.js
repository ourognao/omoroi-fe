import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDRg6ovOxmSfR3BxjAXrwIqCWpT1vT3TJ8',
    libraries: 'places'
  }
})
