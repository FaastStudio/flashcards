<template>
  <v-layout>
    <v-toolbar app class="unselect">
      <v-btn icon @click="goHome()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light unselect">Dex</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-flex v-if="!tool" xs12 sm10 md8 lg6>
      <h1 v-if="!todoCheckbox">Create Deck</h1>
      <h1 v-else>Create To-Do</h1>
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

        <!-- Date Picker -->
        <v-dialog
          v-if="todoCheckbox"
          persistent
          v-model="modal"
          lazy
          full-width
        >
          <v-text-field
            slot="activator"
            label="Set Deadline"
            v-model="deadline"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="deadline" scrollable actions>
            <template>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false, deadline = null">Cancel</v-btn>
                <v-btn flat color="primary" @click="modal = false">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-dialog>

        <v-checkbox
          label="Create To-Do?"
          v-model="todoCheckbox"
        ></v-checkbox>
        <v-btn v-if="!todoCheckbox" :disabled="unlockSubmitButton" color="primary" @click="createDeck()">Create Deck</v-btn>
        <v-btn v-if="todoCheckbox" :disabled="unlockSubmitButton" color="primary" @click="createTodo()">Create To-Do</v-btn>
      </v-form>
    </v-flex>

    <!-- TOOL -->
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
    deadline: null,
    // Date picker modal
    modal: false,
    // Create Card Tool
    tool: false,
    // Mode for adding cards afterwards
    addCardMode: false,
    // Card Input
    cardInput: {
      question: null,
      answer: null
    },
    // Deck Data
    deck: [],
    deckId: null,
    // Todo Checkbox
    todoCheckbox: false
  }),
  mounted () {
    if (this.$route.params.deckId) {
      console.log('add card')
      this.tool = true
      this.addCardMode = true
      this.deckId = this.$route.params.deckId
      this.fetchFullDeck()
    } else {
      this.tool = false
      this.addCardMode = false
    }
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    },
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
          isTodo: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(res => {
          console.info('created')
          this.deckId = res.id
          this.tool = true
        })
          .catch(err => console.error(err))
      }
    },
    createTodo () {
      const deadline = this.deadline ? this.deadline : null
      // Save deck
      firebase.firestore().collection('decks').add({
        creator: firebase.auth().currentUser.uid,
        title: this.title,
        subject: this.subject,
        isTodo: true,
        deadline: deadline,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(res => {
        console.info('created')
        this.$router.push('/home')
      })
        .catch(err => console.error(err))
    },
    saveDeck () {
      // Saving deck after creating cards
      const ref = firebase.firestore().collection('decks').doc(this.deckId)
      // If normaly creating deck
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
      if (this.addCardMode) {
        this.$router.push('/edit/' + this.deckId)
      } else {
        this.$router.push('/home')
      }
    },
    fetchFullDeck () {
      this.tool = true
      let colRef = firebase.firestore().collection('decks')
      colRef.doc(this.$route.params.deckId).get().then((doc) => {
        this.title = doc.data().title
        this.subject = doc.data().subject
      })
    }
  },
  computed: {
    unlockSubmitButton () {
      if (this.title) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
