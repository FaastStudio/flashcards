import store from '../store'
import Firebase from 'firebase/app'
import 'firebase/auth'
import router from '../router'

const config = {
  apiKey: 'AIzaSyDEg6KepP-GTz7rtfDr4TmlGWTJJnPZk_I',
  authDomain: 'flashcards-5bcb1.firebaseapp.com',
  databaseURL: 'https://flashcards-5bcb1.firebaseio.com',
  projectId: 'flashcards-5bcb1',
  storageBucket: 'flashcards-5bcb1.appspot.com',
  messagingSenderId: '498617502369'
}

export default {
  install: (Vue, options) => {
    const firebase = Firebase.initializeApp(config)
    const auth = firebase.auth()
    // config firestore
    const db = firebase.firestore()
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
    Vue.prototype.$auth = {
      login: async (username, pass) => {
        const user = await auth.signInWithEmailAndPassword(username, pass)
        return user
      },
      loginGoogle: async () => {
        const provider = new Firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
          .then((result) => {
            const docRef = firebase.firestore().collection('user')
            const userId = result.user.uid
            const email = result.user.email
            if (docRef.doc(userId)) {
              store.commit('user/updateUser', { result })
              console.log('login', result)
              return result
            } else {
              docRef.doc(userId).set({ id: userId, email })
                .then(() => {
                  store.commit('user/updateUser', { result })
                  return result
                })
                .catch(err => console.log(err))
            }
          }).catch((err) => {
            console.error(err)
          })
      },
      logout: async () => {
        await auth().signOut()
        router.replace('/login')
      }
    }
    auth.onAuthStateChanged(user => {
      store.commit('loadingSpinner', true)
      store.commit('user/updateUser', { user })
      if (user) router.push('/')
      store.commit('loadingSpinner', false)
    })
  }
}
