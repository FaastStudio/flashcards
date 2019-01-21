import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar: false
  },
  mutations: {
    toggleSidebar (state) {
      state.sidebar = !state.sidebar
    }
  },
  actions: {
    toggleSidebar (context) {
      context.commit('toggleSidebar')
    }
  },
  getters: {
    sidebar (state) {
      return state.sidebar
    }
  }
})
