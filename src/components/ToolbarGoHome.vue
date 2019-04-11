<template>
  <div>
    <v-toolbar app>
      <v-btn
        icon
        flat
        @click.native.stop="goHome()"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">
        <router-link
          to="/"
          class="font-weight-light"
          tag="span"
          style="cursor: pointer;"
        >{{ $route.name }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'ToolbarGoHome',
  methods: {
    goHome () {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="stylus" scoped></style>
