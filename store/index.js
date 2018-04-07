export const state = () => ({
  base: {
    locale: {
      locales: ['ja', 'en'],
      selected: 'ja'
    },
    auth: {
      token: null,
      client: null,
      uid: null,
      id: null,
      email: null,
      name: null,
      kind: null
    },
    layout: {
      current: null,
      fullPath: null
    },
    snackbar: {
      message: null,
      visible: false
    },
    confirm: {
      title: null,
      text: null,
      visible: false,
      agreed: null,
      disagreed: null
    }
  },

  auth: {
    login: {
      dialog: false
    },
    password: {
      token: null,
      client: null,
      uid: null
    },
    start: {
      token: null,
      client: null,
      uid: null
    }
  },

  users: {
    index: {
      users: null,
      totalPages: null,
      page: null,
      q: [],
      scroll: 0,
      userId: null,
      dialog: false
    }
  },

  top: {
    index: {
      events: null,
      scroll: 0,
      eventId: null,
      dialog: false,
      futureEvent: null
    }
  },

  events: {
    index: {
      events: null,
      scroll: 0,
      eventId: null,
      dialog: false
    }
  }
})

export const mutations = {
  merge (state, array) {
    let keys = array[0].split('.')
    let data = array[1]
    state[keys[0]][keys[1]] = { ...state[keys[0]][keys[1]], ...data }
  }
}

export const getters = {
  isLogined (state) {
    return !!state.base.auth.uid
  },
  currentUid (state) {
    return state.base.auth.uid
  },
  currentUser (state) {
    return state.base.auth
  },
  options (state) {
    return {
      headers: {
        'access-token': state.base.auth.token,
        client: state.base.auth.client,
        uid: state.base.auth.uid
      }
    }
  },
  params (state) {
    let encodedEmail = encodeURIComponent(`${state.base.auth.uid}`)
    return `access-token=${state.base.auth.token}&client=${state.base.auth.client}&uid=${encodedEmail}`
  }
}
