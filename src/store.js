import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import router from './router'
import user from './store/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  state: {
    // Profile
    user: null,
    // Settings
    isDarkMode: false,
    // Data
    fetchedDecks: [
      {}
    ],
    deleteDialog: false,
    editDeck: false
  },
  mutations: {
    darkMode (state) {
      state.isDarkMode = !state.isDarkMode
    },
    setDecks (state, decks) {
      state.fetchedDecks = decks
    },
    setUser (state, userData) {
      state.user = userData
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
    startPlayMode (context, deckId) {
      router.push('/play/' + deckId)
    },
    deleteDeck (context, deckId) {
      console.log('delete Deck', deckId)
      context.commit('deleteDialog')
    },
    setUser (context) {
      // fetch and save user data to state
      const user = firebase.auth().currentUser
      context.commit('setUser', user)
    },
    toggleDarkMode (context) {
      context.commit('darkMode')
    },
    logout (context) {
      firebase.auth().signOut()
      context.commit('logout')
    }
  },
  getters: {
    fetchedDecks (state) {
      return state.fetchedDecks
    },
    isDarkMode (state) {
      return state.isDarkMode
    }
  }
})
