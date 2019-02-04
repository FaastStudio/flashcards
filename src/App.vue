<template>
  <v-app :dark="isDarkMode">
    <router-view name="toolbar"></router-view>
    <v-content>
      <main>
        <router-view></router-view>
      </main>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    isDarkMode () {
      return this.$store.getters['settings/isDarkMode']
    }
  },
  created () {
    // Fetch user
    this.$store.dispatch('user/currentUser')
    console.log('onLounch', localStorage.getItem('isDarkMode'))
    if (localStorage.getItem('isDarkMode') === true) {
      console.log('setTrue')
      this.$store.settings.state.isDarkMode = true
    }
  }
}
</script>
