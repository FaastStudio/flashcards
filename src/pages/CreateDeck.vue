<template>
  <v-layout>
    <v-flex v-if="!tool" xs12 sm10 md8 lg6>
      <h1>Create Deck</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          label="Title"
          :rules="[v => !!v || 'Item is required']"
          v-model="title"
          required
        ></v-text-field>
        <v-text-field
          label="Subject"
          :rules="[v => !!v || 'Item is required']"
          v-model="subject"
          required
        ></v-text-field>
        <v-btn :disabled="!valid" color="primary" @click="createDeck()">Create Deck</v-btn>
      </v-form>
    </v-flex>
    <v-flex v-if="tool">
      <v-card class="mx-auto" color="#eee" light max-width="400">
        <v-container>
          <v-card-title>
            <span class="title font-weight-light">Question</span>
          </v-card-title>

          <v-text-field label="Your question..."
            v-model="cardInput.question"
            ></v-text-field>

        </v-container>
      </v-card>

      <v-card class="mx-auto mt-3" color="#eee" light max-width="400">
        <v-container>
          <v-card-title>
            <span class="title font-weight-light">Answer</span>
          </v-card-title>

          <v-text-field label="The answer..."
            v-model="cardInput.answer"
            ></v-text-field>

          <v-card-actions>
            <v-btn color="primary" @click="saveCard()">New Card</v-btn>
            <v-btn color="success" @click="saveDeck()">Save Deck</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      Card added
      <v-btn
        color="blue"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
export default {
  name: 'create-deck-page',
  data: () => ({
    snackbar: false,
    valid: true,
    // Input
    title: null,
    subject: null,
    tool: false,
    // Card Input
    cardInput: {
      question: null,
      answer: null
    },
    // Deck Data
    deck: [],
    deckId: null
  }),
  methods: {
    saveCard () {
      if (this.cardInput.question && this.cardInput.question) {
        this.deck.push(
          { question: this.cardInput.question, answer: this.cardInput.answer }
        )
        this.snackbar = true
        this.cardInput.answer = null
        this.cardInput.question = null
        console.log(...this.deck)
      }
    },
    createDeck () {
      if (this.deck !== []) {
        // Save deck
        firebase.firestore().collection('decks').add({
          creator: firebase.auth().currentUser.uid,
          title: this.title,
          subject: this.subject,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(res => {
          console.info('created')
          this.deckId = res.id
          this.tool = true
        })
          .catch(err => console.error(err))
      }
    },
    saveDeck () {
      // Saving deck after creating cards
      const ref = firebase.firestore().collection('decks').doc(this.deckId)
      if (this.cardInput.question && this.cardInput.answer) {
        this.saveCard()
        this.deck.forEach(deck => {
          console.log('card added')
          ref.collection('cards').add(deck)
        })
      } else {
        this.deck.forEach(deck => {
          console.log('card added')
          ref.collection('cards').add(deck)
        })
      }
      this.$router.push('/home')
    }
  }
}
</script>
