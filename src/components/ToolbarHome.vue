<template>
  <div>
    <v-navigation-drawer
      absolute
      temporary
      v-model="sideNav"
    >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          router
          to="/login"
          @click="logout"
        >
          <v-list-tile-action>
            <v-icon class="red--text">lock_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="red--text">Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      temporary
      app
      tabs
    >
      <v-toolbar-side-icon
        v-if="!searchBar"
        @click.native.stop="sideNav = !sideNav"
      ></v-toolbar-side-icon>
      <v-toolbar-title
        class="headline text-uppercase"
        v-if="!searchBar"
      >
        <router-link
          to="/"
          class="font-weight-light"
          tag="span"
          style="cursor: pointer;"
        >Dex</router-link><span class="caption"> Development </span><span class="caption text-lowercase">&alpha;</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!searchBar">
        <v-btn
          @click.native.stop="searchBar = !searchBar"
          icon
          class="hidden-md-and-up"
        >
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-text-field
        class="hidden-sm-and-down"
        flat
        solo
        hide-details
        prepend-inner-icon="search"
        label="Search"
      ></v-text-field>
      <v-text-field
        v-if="searchBar"
        flat
        solo
        hide-details
        prepend-inner-icon="search"
        label="Search"
      ></v-text-field>
      <v-toolbar-items v-if="searchBar">
        <v-btn
          icon
          @click.native.stop="searchBar = !searchBar"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar-items>

      <template v-slot:extension>
        <v-tabs
          color="transparent"
          grow
        >
          <v-tabs-slider color="blue"></v-tabs-slider>
          <v-tab :to="({query: { tab: 'todo' }})">Todo</v-tab>
          <v-tab :to="({query: { tab: 'decks' }})">Decks</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'ToolbarHome',
  data () {
    return {
      searchBar: false,
      sideNav: false,
      menuItems: [
        { icon: 'home', title: 'Home', link: '/' },
        { icon: 'person', title: 'Profile', link: '/profile' },
        { icon: 'settings', title: 'Settings', link: '/settings' }
      ]
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>
