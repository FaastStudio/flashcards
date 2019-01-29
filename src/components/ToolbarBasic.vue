<template>
  <div>
    <v-toolbar temporary app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" class="font-weight-light" tag="span" style="cursor: pointer;">Dex</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'ToolbarBasic',
  data () {
    return {}
  }
}
</script>
