<template>
  <v-app>
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
    <v-toolbar app>
      <v-toolbar-side-icon  v-if="showNavbar" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn v-else icon @click="goBack()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Dex</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content grid-list-md>
      <v-container xs12 sm10 md8 lg6>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'App',
  data () {
    return {
      drawer: false,
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
  },
  methods: {
    toggle () {
      this.$store.dispatch('toggleSidebar')
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  computed: {
    route () {
      return this.$route.name
    },
    showNavbar () {
      if (this.route === 'create-deck-page') {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    console.log('Authenticated', !!firebase.auth().currentUser)
  }
}
</script>
