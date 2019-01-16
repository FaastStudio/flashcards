import Vue from 'vue'
import Vuesax from 'vuesax'
import VueI18n from 'vue-i18n'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'vuesax/dist/vuesax.css' // Vuesax styles
import 'material-icons/iconfont/material-icons.css' // Material Icons

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDEg6KepP-GTz7rtfDr4TmlGWTJJnPZk_I',
  authDomain: 'flashcards-5bcb1.firebaseapp.com',
  databaseURL: 'https://flashcards-5bcb1.firebaseio.com',
  projectId: 'flashcards-5bcb1',
  storageBucket: 'flashcards-5bcb1.appspot.com',
  messagingSenderId: '498617502369'
}
firebase.initializeApp(config)

// config firestore
var db = firebase.firestore()
// Timestamps
db.settings({
  timestampsInSnapshots: true
})
// Persistance
db.enablePersistence()
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })

Vue.config.productionTip = false

Vue.use(Vuesax)
Vue.use(VueI18n)

const i18n = new VueI18n({})

let app = ''
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      i18n,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
