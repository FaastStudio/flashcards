const fetchRequest = (state) => {
  state.isFetching = true
}

const fetchSuccess = (state, user) => {
  state.isFetching = false
  state.user = user
}

const fetchError = (state, message) => {
  state.isFetching = false
  state.errorMessage = message
}

const updateUser = (state, { user }) => {
  state.user = user
}

export default {
  fetchError,
  fetchRequest,
  fetchSuccess,
  updateUser
}
