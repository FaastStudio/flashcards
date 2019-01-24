<template>
  <v-layout row wrap>
    <create-deck></create-deck>
    <deck-card v-for="deck in decksData" :key="deck.id" :doc="deck" @click.native="longPress(deck)" v-longpress="(event) => {startLearning(deck) }"></deck-card>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import CreateDeck from '@/components/OverviewCreateDeck.vue'
import DeckCard from '@/components/OverviewDeckCard.vue'
export default {
  name: 'overview',
  components: {
    CreateDeck,
    DeckCard
  },
  data () {
    return {
      decksData: []
    }
  },
  async created () {
    const deckRef = await firebase.firestore().collection('decks')
    const userId = await firebase.auth().currentUser.uid
    deckRef.where('creator', '==', userId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.decksData.push(doc)
        console.log(doc.id, ':', doc.data(), doc.metadata.fromCache)
      })
    })
  },
  methods: {
    longPress (deck) {
      this.$router.push('/edit/' + deck.id)
    },
    startLearning (deck) {
      let r = confirm(`Start learning ${deck.data().title}`)
      if (r) this.$router.push('/learn/' + deck.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: 0;
  min-height: 100px;
  border-radius: 15px;
  box-shadow: 3px 6px 8px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
