<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list class="py-3">
      <v-list-tile>
        <v-list-tile-content>
          <h2 style="margin: auto">DEX</h2>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list class="pt-1">
      <v-divider></v-divider>
      <v-list-tile v-for="item in items" :key="item.title">
        <v-list-tile-action>
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.title }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'dashboard'
        },
        {
          title: 'Profile'
        }
      ]
    }
  }
}
</script>
