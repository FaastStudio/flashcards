<template>
  <v-layout>
    <!-- Delete dialog -->
    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Delete whole deck?</v-card-title>
        <v-card-text>After deleting the deck you can not restore it!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" flat @click="deleteDeck()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Change Deck-data model -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Deck Data</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-if="deckRef" v-model="deckRef.title" label="Title" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-if="deckRef" v-model="deckRef.subject" label="Subject" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="updateDeckData()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- TOOLBAR -->
    <v-toolbar app class="unselect">
      <v-btn icon @click="goHome()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light unselect">Edit Deck</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Right Side -->
      <v-btn icon @click="dialog = !dialog">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn icon @click="deleteDialog = true">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar>

    <v-flex>
      <v-card flat style="background: transparent;">
        <v-card-title>
          <v-container fluid>
            <v-layout wrap>
              <v-flex xs12>
                <span class="headline" v-if="deckRef"> {{ deckRef.subject }} </span>
              </v-flex>
              <v-flex xs12>
                <span class="title" v-if="deckRef"> {{ deckRef.title }} </span>
              </v-flex>
              <v-flex xs12>
                <span class="excerpt" v-if="deckRef.deadline">Deadline: {{ deckRef.deadline }} </span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-title>
        <v-card v-for="card in cards" :key="card.id" class="mt-3">
          <v-container>
            <v-card-title class="subheading">
              {{ card.data().question }}?
            </v-card-title>
            <v-layout row class="mt-3">
              <v-flex xs2><v-icon>priority_hight</v-icon></v-flex>
              <v-flex xs10>{{ card.data().answer }}</v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-card>
    </v-flex>
    <!-- FAB -->
    <v-btn
      absolute
      dark
      fab
      color="pink"
      class="fab"
      @click="addCard"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
  name: 'edit-deck',
  data () {
    return {
      deckRef: false,
      cards: [],
      // deck data edit modal
      dialog: false,
      deleteDialog: false
    }
  },
  computed: {
    deckId () {
      return this.$route.params.deckId
    },
    Cdeadline () {
      if (this.deckRef.deadline !== null) return this.deckRef.deadline
      else return false
    }
  },
  created () {
    const deckRef = firebase.firestore().collection('decks').doc(this.deckId)
    deckRef.get().then((doc) => {
      if (doc.exists) {
        this.deckRef = doc.data()
      }
    })
    deckRef.collection('cards').get().then(querySnapshot => {
      querySnapshot.forEach(doc => this.cards.push(doc))
    })
  },
  methods: {
    // On FAB click, add new Card
    addCard () {
      this.$router.push('/create/' + this.deckId)
    },
    goHome () {
      this.$router.push('/home')
    },
    // update deck data
    updateDeckData () {
      firebase.firestore().collection('decks').doc(this.deckId).update(this.deckRef)
    },
    deleteDeck () {
      console.log('delete Deck')
      firebase.firestore().collection('decks').doc(this.deckId).delete().then(
        this.$router.push('/home')
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .fab {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 20px;
    margin-right: 20px;
  }
</style>
