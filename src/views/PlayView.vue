<template>
  <v-container fill-height>
    <v-layout v-if="gameStart" justify-center align-center>
      <v-flex fill-height xs12>
        <v-card flat @click.native.stop="showAnswer = true" style="height: 100%; display: flex; flex-direction: column;
        background-color: transparent; justify-content: space-between;">
          <div class="content">
            <v-card-title>
              <span v-if="displayQuestion" class="display-1 mt-5"> {{ displayQuestion }}? </span>
            </v-card-title>
            <v-card-text v-if="showAnswer">
              <span class="subheading">{{ displayAnswer }}</span>
            </v-card-text>
          </div>
          <div class="action mb-3" v-if="showAnswer">
            <v-card-actions style="display: flex; align-items: center; justify-content: space-evenly">
                <v-btn depressed color="red" @click.native.stop="answerWrong()">Answer False</v-btn>
                <v-btn depressed color="green" @click.native.stop="answerTrue()">Anser True</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <div style="display: flex; flex-direction: column; margin: 0 auto;" v-else>
      <span class="display-1 mb-3">Well, done!</span>
      <v-btn color="green" outline @click.native.stop="cardCount = 0">Restart</v-btn>
      <v-btn color="red" outline @click.native.stop="goHome()">back Home</v-btn>
    </div>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
  name: 'PlayView',
  data () {
    return {
      deck: null,
      cards: [],
      // show
      showAnswer: false,
      cardCount: 0
    }
  },
  computed: {
    gameStart () {
      const max = this.cards.length
      const current = this.cardCount
      if (current < max) return true
      else return false
    },
    displayQuestion () {
      if (this.cards[this.cardCount]) {
        return this.cards[this.cardCount].question
      } else {
        return null
      }
    },
    displayAnswer () {
      if (this.cards[this.cardCount]) {
        return this.cards[this.cardCount].answer
      } else {
        return null
      }
    }
  },
  methods: {
    fetchDeck () {
      firebase.firestore().collection('decks').doc(this.$route.params.deckId).get()
        .then(deck => {
          this.deck = deck.data()
          this.deck.id = deck.id
          console.log('fetchedDeck', this.deck)
        })
    },
    fetchCard () {
      firebase.firestore().collection('decks').doc(this.$route.params.deckId).collection('cards').get()
        .then(snap => {
          let cardArray = []
          snap.forEach(card => {
            cardArray.push(card.data())
          })
          this.cards = cardArray
        })
    },
    answerWrong () {
      this.showAnswer = false
      this.cards.push(this.cards[this.cardCount])
      this.cardCount++
    },
    answerTrue () {
      this.showAnswer = false
      this.cardCount++
    },
    goHome () {
      this.$router.replace('/')
    }
  },
  created () {
    this.deck = null
    this.cards = []
    this.fetchDeck()
    this.fetchCard()
  }
}
</script>
