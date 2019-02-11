<template>
  <v-container>
    <v-layout>
      <v-dialog v-model="deleteDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Delete Todo</span>
          </v-card-title>
          <v-card-text>Delete this Todo permanently. It can NOT be restored afterwards!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDeleteDialog()">Cancel</v-btn>
            <v-btn color="red darken-1" flat @click="deleteDeck()">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Change Deck-data model -->

      <v-dialog
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
                    <v-select
                      :items="['low', 'medium', 'hight']"
                      v-model="deckRef.priority"
                      label="Priority"
                    ></v-select>
                    <!-- Date Picker -->
                    <v-menu
                        ref="menu"
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

                      <v-textarea outline label="Details" v-model="deckRef.details"></v-textarea>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>

      <v-flex>
        <v-card flat :style="{background: background}">
          <v-card-title>
            <v-container fluid>
              <v-layout column>
                <v-flex xs12><span class="headline font-weight-medium" v-if="deckRef">{{ deckRef.subject }}</span></v-flex>
                <v-flex xs12><span class="display-1" v-if="deckRef">{{ deckRef.title }}</span></v-flex>
                <v-flex xs12><span class="title" v-if="deckRef.deadline"><v-icon>event</v-icon> {{ deckRef.deadline }} </span></v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text v-if="deckRef.details">
            <v-container>
              <v-layout>
                <v-flex xs12>
                  <pre>
                    {{ deckRef.details }}
                  </pre>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
  name: 'edit-deck',
  data () {
    return {
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
    background () {
      if (this.deckRef.priority === 'low') {
        return '#1E88E5'
      } else if (this.deckRef.priority === 'medium') {
        return '#FF8A65'
      } else if (this.deckRef.priority === 'hight') {
        return '#E53935'
      } else {
        return 'none'
      }
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
