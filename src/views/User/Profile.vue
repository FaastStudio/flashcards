<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <v-card>
          <v-container fluid>
            <v-layout column align-center>
              <v-flex xs12>
                <v-avatar
                  :tile="false"
                  :size="80"
                >
                  <img :src="user.photoURL" alt="user.displayName">
                </v-avatar>
              </v-flex>
              <v-flex xs12><span class="display-1"> {{ user.displayName }} </span></v-flex>
            </v-layout>
          </v-container>
        </v-card>
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
  created () {
    this.$store.dispatch('user/currentUser')
  },
  computed: {
    user () {
      return this.$store.getters['user/currentUser']
    }
  }
}
</script>
