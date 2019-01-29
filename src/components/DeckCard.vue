<template>
  <v-flex v-if="deck" xs6 md4 lg3>
    <v-card :dark="isDarkMode" :class="{ 'white--text': deck.isTodo }" :color="color" min-height="120px" ripple :to="routerDiff(deck.isTodo, deck.id)" style="border-radius: 8px">
      <v-card-title class="body-2">{{ deck.subject }}</v-card-title>
      <v-card-text class="body-1">{{ deck.title }}</v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import 'firebase/firestore'
export default {
  name: 'DeckCard',
  props: {
    deck: {
      type: Object,
      required: true
    }
  },
  computed: {
    color () {
      if (this.deck.isTodo) {
        if (this.deck.priority === 'low') {
          return '#1E88E5'
        }
        if (this.deck.priority === 'medium') {
          return '#FF8A65'
        } else return '#E53935'
      } else {
        return 'none'
      }
    },
    isDarkMode () {
      return this.$store.state.isDarkMode
    }
  },
  methods: {
    routerDiff (type, id) {
      if (type) {
        return `/todo/${id}`
      } else {
        return `/deck/${id}`
      }
    }
  }
}
</script>
