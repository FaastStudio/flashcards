import firebase from 'firebase/app'
import 'firebase/auth'

const currentUser = async (context) => {
  try {
    context.commit('fetchRequest')
    const user = firebase.auth().currentUser
    console.log('fetched and set user', user)
    context.commit('fetchSuccess', user)
    if (user === null) throw new Error('Please check your internet connection or log in again!')
  } catch (e) {
    context.commit('fetchError', e.message)
    console.log(e.message)
  }
}

export default {
  currentUser
}
