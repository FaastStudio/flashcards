<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <v-checkbox @click.native="toggleDarkMode()" value="isDarkMode" label="Dark mode"></v-checkbox>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {}
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.isDarkMode
    }
  },
  methods: {
    toggleDarkMode () {
      this.$store.dispatch('toggleDarkMode')
    }
  }
}
</script>
