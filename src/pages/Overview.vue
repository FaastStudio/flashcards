<template>
  <div class="overview" style="margin: auto auto; margin-top: 2rem;">
    <vs-row vs-w="12" vs-type="flex" vs-justify="space-around" vs-align="left" style="padding: 10px;">
      <create-deck></create-deck>
      <deck-card v-for="deck in sampleData" :title="deck.data().title" :key="deck.id"></deck-card>
    </vs-row>
  </div>
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
      sampleData: []
    }
  },
  created () {
    const deckRef = firebase.firestore().collection('decks')
    const userId = firebase.auth().currentUser.uid
    deckRef.where('creator', '==', userId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.sampleData.push(doc)
        console.log(doc.id, ':', doc.data(), doc.metadata.fromCache)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
