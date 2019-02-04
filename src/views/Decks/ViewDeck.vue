<template>
  <v-container>
    <v-layout>
      <v-dialog v-if="isOwner" v-model="deleteDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline" v-if="!isTodo">Delete Deck</span>
            <span class="headline" v-else>Delete Todo</span>
          </v-card-title>
          <v-card-text>Delete this deck permanently. It can NOT be restored afterwards!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDeleteDialog()">Cancel</v-btn>
            <v-btn color="red darken-1" flat @click="deleteDeck()">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Change Deck-data model -->

      <v-dialog
        v-if="isOwner"
        v-model="editDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click.native="closeEditDialog()">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="updateDeckData()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-layout column>
                <v-flex xs12 md8 lg6>
                  <v-form>
                    <v-text-field label="Title" v-model="deckRef.title"></v-text-field>
                    <v-text-field label="Subject" v-model="deckRef.subject"></v-text-field>
                    <v-select v-if="deckRef.isTodo"
                      :items="['low', 'medium', 'hight']"
                      v-model="deckRef.priority"
                      label="Priority"
                    ></v-select>
                    <!-- Date Picker -->
                    <v-menu
                        ref="menu"
                        v-if="deckRef.isTodo"
                        :close-on-content-click="false"
                        v-model="datePicker"
                        :nudge-right="40"
                        :return-value.sync="deckRef.deadline"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="deckRef.deadline"
                          label="Set Date"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="deckRef.deadline" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.menu.save(deckRef.deadline)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>

      <v-flex>
        <v-card flat style="background: transparent;">
          <v-card-title>
            <span class="headline" v-if="deckRef">{{ deckRef.title }}</span>
          </v-card-title>
          <v-card v-for="card in cards" :key="card.id" class="mt-3">
            <v-container>
              <v-card-title class="subheading">{{ card.data().question }}?</v-card-title>
              <v-layout row class="mt-3">
                <v-flex xs2>
                  <v-icon>priority_hight</v-icon>
                </v-flex>
                <v-flex xs10>{{ card.data().answer }}</v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-card>
      </v-flex>
      <!-- FAB -->
      <v-btn absolute dark fab color="pink" v-if="isOwner" class="fab" @click="addCard">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
  name: 'viewDeck',
  data () {
    return {
      owner: false,
      deckRef: {},
      cards: [],
      // deck data edit modal
      dialog: true,
      datePicker: false
    }
  },
  computed: {
    deckId () {
      return this.$route.params.deckId
    },
    isTodo () {
      return this.deckRef.isTodo
    },
    deleteDialog () {
      return this.$store.state.deleteDialog
    },
    editDialog () {
      return this.$store.state.editDeck
    },
    isOwner () {
      if (this.$store.getters['user/currentUser'] === null) return false
      else return this.$store.getters['user/currentUser'].uid === this.owner
    }
  },
  created () {
    const deckRef = firebase
      .firestore()
      .collection('decks')
      .doc(this.$route.params.deckId)
    deckRef.get().then(doc => {
      if (doc.exists) {
        this.deckRef = doc.data()
        this.owner = doc.data().creator
      }
    })
    deckRef
      .collection('cards')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => this.cards.push(doc))
      })
  },
  methods: {
    // On FAB click, add new Card
    addCard () {
      if (this.isOwner) {
        this.$router.push('/create/' + this.deckId)
      }
    },
    // update deck data
    updateDeckData () {
      firebase
        .firestore()
        .collection('decks')
        .doc(this.deckId)
        .update(this.deckRef)
        .then(this.$store.state.editDeck = false)
    },
    closeDeleteDialog () {
      this.$store.commit('deleteDialog')
    },
    closeEditDialog () {
      this.$store.state.editDeck = false
    },
    deleteDeck () {
      firebase
        .firestore()
        .collection('decks')
        .doc(this.deckId)
        .delete()
        .then(this.$store.commit('deleteDialog'))
        .then(this.$router.push('/'))
    }
  }
}
</script>

<style lang="stylus" scoped>
.fab {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>
