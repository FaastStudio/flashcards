import firebase from 'firebase/app'
import 'firebase/auth'

const currentUser = (context) => {
  const user = firebase.auth().currentUser
  context.commit('UPDATE_USER', user)
  console.log('fetched and set user', user)
}

export default {
  currentUser
}
