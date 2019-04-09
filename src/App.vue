<template>
  <v-app :dark="isDarkMode">
    <router-view name="toolbar"></router-view>
    <v-content transition="fade-transition">
      <router-view></router-view>
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
  methods: {
    setTheme () {
      let theme = localStorage.getItem('isDarkMode')
      let currentTheme = this.$store.getters['settings/isDarkMode']
      if (theme === 'true' && !currentTheme) this.$store.dispatch('settings/toggleDarkMode')
    }
  },
  created () {
    this.setTheme()
  },
  updated () {
    this.setTheme()
  }
}
</script>
