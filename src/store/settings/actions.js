const toggleDarkMode = async (context) => {
  await context.commit('TOGGLE_DARK_MODE')
  const currentTheme = context.getters['isDarkMode']
  const local = localStorage.getItem('isDarkMode')
  if (local === 'false' && currentTheme) {
    localStorage.setItem('isDarkMode', true)
  }
  if (!currentTheme && (local === 'true')) {
    localStorage.setItem('isDarkMode', false)
  }
}

export default {
  toggleDarkMode
}
