<template>
  <v-app>
      <v-navigation-drawer class="unselect" v-model="drawer" absolute temporary>
        <v-list class="py-3">
          <v-list-tile>
            <v-list-tile-content>
              <h2 class="unselect" style="margin: auto">DEX</h2>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list class="pt-1">
          <v-divider></v-divider>
          <v-list-tile class="unselect" v-for="item in items" :key="item.title">
            <v-list-tile-action>
              <v-icon class="unselect">
                {{ item.icon }}
              </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="unselect">
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    <v-toolbar v-if="showNavbar" app class="unselect">
      <v-toolbar-side-icon class="unselect" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light unselect">Dex</span>
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
      if (this.route === 'overview') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    console.log('Authenticated', !!firebase.auth().currentUser)
  }
}
</script>

<style lang="scss" scoped>
.unselect {
  user-select: none;
}
</style>
