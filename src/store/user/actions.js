const currentUser = async ({ commit }, user) => {
  console.log('action', user)
  commit('updateUser', user)
}

export default {
  currentUser
}
