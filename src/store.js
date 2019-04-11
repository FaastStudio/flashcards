import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import router from './router'
import user from './store/user'
import settings from './store/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    settings
  },
  state: {
    // Profile
    user: null,
    // UI
    loadingSpinner: false,
    // Data
    fetchedDecks: [],
    deleteDialog: false,
    editDeck: false
  },
  mutations: {
    loadingSpinner (state, bool) {
      state.loadingSpinner = bool
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
      const user = context.getters['user/user']
      const userId = user.uid
      const deckRef = await firebase.firestore().collection('decks')
      let decks = []
      deckRef.where('creator', '==', userId).orderBy('createdAt', 'desc').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let pre = doc.data()
          pre.id = doc.id
          decks.push(pre)
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
    logout (context) {
      firebase.auth().signOut()
      context.commit('logout')
    }
  },
  getters: {
    fetchedDecks (state) {
      return state.fetchedDecks
    },
    loadingSpinner: state => state.loadingSpinner
  }
})
