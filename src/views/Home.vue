<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        xs6
        md4
        lg3
        transition="fade-transition"
      >
        <v-card
          class="text-xs-center"
          min-height="120px"
          to="/deck/create"
          ripple
          style="border-radius: 8px"
        >
          <div class="add_button">
            <v-icon>add_box</v-icon><span>Add {{ createCardText }}</span>
          </div>
        </v-card>
      </v-flex>
      <deck-card
        v-for="deck in decks"
        :key="deck.id"
        :deck="deck"
      />
    </v-layout>
  </v-container>
</template>

<script>
import DeckCard from '@/components/DeckCard.vue'
export default {
  name: 'Home',
  components: {
    DeckCard
  },
  data () {
    return {}
  },
  computed: {
    decks () {
      let route = this.$route.query.tab || 'todo'
      let isTodo = true
      if (route === 'decks') isTodo = false
      let fullDecks = this.$store.getters.fetchedDecks
      fullDecks = fullDecks.filter(deck => deck.isTodo === isTodo)
      return fullDecks
    },
    createCardText () {
      const route = this.$route.query.tab || 'todo'
      if (route === 'todo') return 'Todo'
      else return 'Deck'
    }
  },
  created () {
    this.$store.dispatch('fetchDecks')
  }
}
</script>

<style lang="stylus" scoped>
.add_button {
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
