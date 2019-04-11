const TOGGLE_DARK_MODE = (state) => {
  state.isDarkMode = !state.isDarkMode
  localStorage.setItem('isDarkMode', state.isDarkMode)
}

export default {
  TOGGLE_DARK_MODE
}
