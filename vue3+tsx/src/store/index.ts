import { createStore } from 'vuex'

const store = createStore({
  state: {
    userInfo: {},
    showLoading: true, //全局loading,
  },
  mutations: {
    setUserInfo(state, dictionaries) {
      state.userInfo = dictionaries
    },
    updateLoading(state, showLoading) {
      state.showLoading = showLoading
    },
  },
  actions: {},
  getters: {
    getUserInfo: (state) => {
      return state.userInfo
    },
  },
  modules: {},
})

export default store
