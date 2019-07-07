export const state = () => ({
  base: {
    locale: {
      selected: 'ja',
      locales: ['ja', 'en']
    },
    auth: {
      uprovider: null,
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
    },
    waiting: {
      text: null,
      visible: false
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
      section: null,
      dialog: false,
      futurEvent: null,
      futurEvents: [],
      currentMonth: null,
      currentMonths: null
    }
  },

  pictures: {
    index: {
      uploadedPictureIds: []
    }
  },
  events: {
    index: {
      events: null,
      totalPages: null,
      page: null,
      q: [],
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
    switch (keys.length) {
      case 2:
        state[keys[0]][keys[1]] = { ...state[keys[0]][keys[1]], ...data }
        break
      case 3:
        state[keys[0]][keys[1]][keys[2]] = { ...state[keys[0]][keys[1]][keys[2]], ...data }
        break
    }
  }
}

export const getters = {
  screenRightsFor: (state) => (screen) => {
    switch (screen) {
      case 'events':
        return state.base.auth.kind !== 'customer'
      default:
        return true
    }
  },
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
