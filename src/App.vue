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
      return this.$store.state.isDarkMode
    }
  }
}
</script>
