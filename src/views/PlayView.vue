<template>
  <v-container fill-height fluid style="width: 100vw; overflow: hidden;">
    <v-layout v-if="gameStart" justify-center align-center>
      <v-flex fill-height xs12>
        <v-card flat @click.native.stop="showAnswer = true" style="height: 100%; display: flex; flex-direction: column;
        background-color: transparent; justify-content: space-between;">
          <div class="content">
            <v-card-title>
                  <div xs12 class="mt-4">
                    <p v-if="info1 < 2" class="caption info--text">Answer this question then tab the screen...</p>
                    <p v-if="displayQuestion" class="display-1 mt-0" style="width: 100%; word-wrap: break-word;">{{ displayQuestion }}?</p>
                  </div>
            </v-card-title>

            <v-card-text v-if="showAnswer">
              <pre>{{ displayAnswer }}</pre>
            </v-card-text>

          </div>

          <div class="action mb-3" v-if="showAnswer">
            <p class="body-2 mb-1 ml-3 info--text">Was your answer correct..?</p>
            <v-card-actions style="display: flex; align-items: center; justify-content: space-evenly">
                <v-btn depressed color="red white--text" @click.native.stop="answerWrong()">Answer False</v-btn>
                <v-btn depressed color="green white--text" @click.native.stop="answerTrue()">Anser True</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <div style="display: flex; flex-direction: column; margin: 0 auto;" v-if="!gameStart && cards.length > 0">
      <span class="display-1 mb-3">Well, done!</span>
      <v-btn color="green" outline @click.native.stop="restart()">Restart</v-btn>
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
      cardCount: 0,
      info1: 0
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
        })
    },
    fetchCard () {
      firebase.firestore().collection('decks').doc(this.$route.params.deckId).collection('cards').get()
        .then(snap => {
          let cardArray = []
          snap.forEach(card => {
            cardArray.push(card.data())
          })
          this.shuffle(cardArray)
        })
    },
    shuffle (arra1) {
      let ctr = arra1.length
      let temp
      let index
      while (ctr > 0) {
        index = Math.floor(Math.random() * ctr)
        ctr--
        temp = arra1[ctr]
        arra1[ctr] = arra1[index]
        arra1[index] = temp
      }
      this.cards = arra1
    },
    answerWrong () {
      this.showAnswer = false
      this.cards.push(this.cards[this.cardCount])
      this.cardCount++
      this.info1++
    },
    answerTrue () {
      this.showAnswer = false
      this.cardCount++
      this.info1++
    },
    restart () {
      this.cards = []
      this.fetchCard()
      this.cardCount = 0
      this.info1 = 3
    },
    goHome () {
      this.$router.replace('/')
    }
  },
  created () {
    this.info1 = 0
    this.deck = null
    this.cards = []
    this.fetchDeck()
    this.fetchCard()
  }
}
</script>
