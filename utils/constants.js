export default {
  defaultUrl: {
    frontend: {
      development: 'http://127.0.0.1:3000',
      staging: 'https://omoroi-staging-fe.herokuapp.com',
      production: 'https://omoroi-fe.herokuapp.com'
    },
    backend: {
      development: 'http://127.0.0.1:4000',
      staging: 'https://omoroi-be-staging.herokuapp.com',
      production: 'https://omoroi-be.herokuapp.com'
    }
  },
  sns: {
    hashtags: 'omoroi,party,sport,social,japan'
  },
  gmap: {
    markerIcon: 'http://maps.google.com/mapfiles/ms/icons/red.png',
    zoom: 17,
    width: 23,
    height: 23,
    pixel: 'px',
    positions: {
      osaka: [34.6937378, 135.50216509999996]
    }
  }
}
