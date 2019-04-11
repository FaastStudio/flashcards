const toggleDarkMode = async (context) => {
  await context.commit('TOGGLE_DARK_MODE')
}

export default {
  toggleDarkMode
}
