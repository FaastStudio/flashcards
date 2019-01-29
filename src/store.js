import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDarkMode: false,
    fetchedDecks: [
      {}
    ],
    deleteDialog: false,
    editDeck: false
  },
  mutations: {
    setDecks (state, decks) {
      state.fetchedDecks = decks
    },
    deleteDialog (state) {
      state.deleteDialog = !state.deleteDialog
    },
    logout (state) {
      state.fetchedDecks = [{}]
    }
  },
  actions: {
    async fetchDecks (context) {
      const deckRef = await firebase.firestore().collection('decks')
      const userId = await firebase.auth().currentUser.uid
      let decks = []
      deckRef.where('creator', '==', userId).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let pre = doc.data()
          pre.id = doc.id
          decks.push(pre)
          console.log(doc.id, ':', pre, doc.metadata.fromCache)
        })
        context.commit('setDecks', decks)
      })
    },
    deleteDeck (context, deckId) {
      console.log('delete Deck', deckId)
      context.commit('deleteDialog')
    },
    logout (context) {
      firebase.auth().signOut()
      context.commit('logout')
    }
  },
  getters: {
    fetchedDecks (state) {
      return state.fetchedDecks
    }
  }
})
