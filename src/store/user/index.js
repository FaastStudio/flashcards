import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  userData: {}
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
