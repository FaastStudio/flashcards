const toggleDarkMode = (context) => {
  context.commit('TOGGLE_DARK_MODE')
  localStorage.setItem('isDarkMode', context.getters['isDarkMode'])
  console.log('setMode', localStorage.getItem('isDarkMode'))
}

export default {
  toggleDarkMode
}
