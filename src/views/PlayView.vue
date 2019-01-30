<template>
  <v-container fluid style="height: 100vh;">
    <v-layout style="height: 100vh;" fill-height justify-center align-center column v-if="!startGame">
      <v-flex xs12> Start Learning! </v-flex>
      <v-flex xs12 @click="startGame = !startGame" > <v-btn color="success">Start <v-icon>play_arrow</v-icon></v-btn> </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12>
        <v-card @click.native.stop="reveal()" flat>
          <v-card-title>
            <v-container fluid>
              <v-layout justify-center align-center>
                <v-flex xs12>{{ displayCard.question }}</v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text v-if="showAnswer">
            <v-container fluid>
              <v-layout justify-center align-center>
                <v-flex xs12> {{ displayCard.answer }} </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions v-if="showAnswer">
            <v-spacer></v-spacer>
            <v-btn flat @click.native.stop="answerFalse()">
              False
            </v-btn>
            <v-btn flat @click.native.stop="answerTrue()">
              True
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
  name: 'PlayView1',
  data () {
    return {
      // Fetched Data
      deckId: null,
      cards: [],
      // Game options
      startGame: false,
      cardCount: 0,
      showAnswer: false
    }
  },
  methods: {
    fetchCards () {
      this.deckId = this.$route.params.deckId
      firebase.firestore().collection('decks').doc(this.deckId).collection('cards').get().then(snapshot => {
        snapshot.forEach(card => this.cards.push(card))
      })
    },
    answerTrue () {
      this.showAnswer = false
      this.cardCount++
    },
    answerFalse () {
      this.showAnswer = false
      this.cardCount++
    },
    reveal () {
      this.showAnswer = true
    }
  },
  computed: {
    displayCard () {
      if (this.cardCount >= this.cards.length) {
        this.$router.replace('/')
        console.log('Deck completed')
      }
      return this.cards[this.cardCount].data()
    }
  },
  created () {
    this.cardCount = 0
    this.fetchCards()
  }
}
</script>
