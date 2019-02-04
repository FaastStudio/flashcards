<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <v-list two-line style="background: transparent">
          <v-subheader>Theme</v-subheader>
          <v-list-tile>
            <v-checkbox @click.native="toggleDarkMode()" v-model="darkMode" label="Dark mode"></v-checkbox>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      darkMode: false
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.getters['settings/isDarkMode']
    }
  },
  created () {
    this.darkMode = this.isDarkMode
  },
  methods: {
    toggleDarkMode () {
      this.$store.dispatch('settings/toggleDarkMode')
    }
  }
}
</script>
