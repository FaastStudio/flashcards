<template>
  <div>
    <v-toolbar temporary app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" class="font-weight-light" tag="span" style="cursor: pointer;">Dex</router-link><span class="caption">  Development </span><span class="caption text-lowercase">&alpha;</span>
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
