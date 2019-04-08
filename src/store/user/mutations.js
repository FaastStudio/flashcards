const fetchRequest = (state) => {
  state.isFetching = true
}

const fetchSuccess = (state, user) => {
  state.isFetching = false
  state.userData = user
}

const fetchError = (state, message) => {
  state.isFetching = false
  state.errorMessage = message
}

const fetchUser = (state, user) => {
  state.userData = user
}

export default {
  fetchError,
  fetchRequest,
  fetchSuccess,
  fetchUser
}
