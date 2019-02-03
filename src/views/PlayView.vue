<template>
  <v-container class="container" fluid style="height: 100vh;">
    <div class="startView" column justify-center v-if="!startGame && !endGame">
      <span class="display-1">Start Learning!</span>
      <v-btn color="success" class="mt-5" @click="startGame = !startGame">Start<v-icon>play_arrow</v-icon></v-btn>
      <v-btn color="red" class="mt-5" outline @click.native="goBack()" >Cancel<v-icon>close</v-icon></v-btn>
    </div>
    <v-layout v-if="startGame && !endGame" fill-height justify-center align-center>
      <v-flex xs12 md8 lg6 @click.native.stop="reveal()">
        <v-card @click.native.stop="reveal()" flat>
          <v-card-title>
            <v-container fluid>
              <v-layout justify-center align-center>
                <v-flex xs12 class="display-1">{{ displayCard.question }}?</v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text v-if="showAnswer" class="body-2">
          <v-container fluid>
            <v-layout>
              <v-flex>{{ displayCard.answer }}</v-flex>
            </v-layout>
          </v-container>
          </v-card-text>
          <v-card-actions v-if="showAnswer">
            <v-container>
              <v-layout row>
                <v-flex xs6>
                  <v-btn color="red" flat @click.native.stop="answerFalse()">
                    False
                  </v-btn>
                </v-flex>
                <v-flex xs6>
                  <v-btn color="success" flat @click.native.stop="answerTrue()">
                    True
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="startView" column justify-center v-if="endGame && !startGame">
      <span class="display-1">Well done!</span>
      <v-btn color="success" class="mt-5">Restart <v-icon>arrow_left</v-icon></v-btn>
      <v-btn color="red" class="mt-5" outline @click.native.stop="goHome()">Home <v-icon>close</v-icon></v-btn>
    </div>
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
      showAnswer: false,
      wrongCount: 0,
      rightCount: 0,
      wrongCards: []
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
      this.rightCount++
    },
    answerFalse () {
      this.showAnswer = false
      this.cardCount++
      this.wrongCount++
      this.wrongCards.push(this.displayCard)
    },
    reveal () {
      this.showAnswer = true
    },
    setEndGame () {
      this.startGame = false
    },
    goHome () {
      this.$router.replace(`/deck/${this.deckId}`)
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  computed: {
    displayCard () {
      if (this.cardCount > this.cards.length) {
        console.log('Deck completed')
        this.setEndGame()
        return this.cards[0].data()
      } else return this.cards[this.cardCount].data()
    },
    endGame () {
      if (this.cardCount > this.cards.length - 1) {
        return true
      } else return false
    }
  },
  created () {
    this.startGame = false
    this.cards = []
    this.wrongCards = []
    this.rightCount = 0
    this.wrongCount = 0
    this.showAnswer = false
    this.cardCount = 0
    this.fetchCards()
  }
}
</script>

<style lang="stylus" scoped>
.container
  .startView
    height 100%
    display flex
    flex-direction column
    justify-content center
    align-items center
</style>
