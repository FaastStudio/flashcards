<template>
  <v-container>
    <v-layout wrap justify-center align-center class="text-xs-center text-lg-left" style="margin-top: 18vh;">
      <v-flex xs12 class="mb-5"><span class="display-1">DEX</span></v-flex>
      <v-flex xs12 mb6 class="mb-3">
        <p class="subheading">Create digital flashcard decks and have them ready on every device.
          <br>
          Study better with advanced learning games on the go!
        </p>
      </v-flex>
      <v-flex xs12 class="mb-4"><span class="display-1">Start learning now!</span></v-flex>
      <v-flex xs12>
        <v-tooltip v-model="show" bottom>
          <v-btn slot="activator" large depressed round color="primary" @click.native="loginGoogle(), show = !show">Start now using Google</v-btn>
          <span>Only available with Google Auth at the moment</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'SignIn',
  data () {
    return {
      // email: {
      //   input: ''
      // },
      // password: {
      //   input: ''
      // },
      show: true
    }
  },
  methods: {
    // login () {
    //   firebase.auth().signInWithEmailAndPassword(this.email.input, this.password.input).then((result) => {
    //     const docRef = firebase.firestore().collection('user')
    //     const userId = result.user.uid
    //     const email = result.user.email
    //     if (docRef.doc(userId)) {
    //       return this.$router.replace('home')
    //     } else {
    //       docRef.doc(userId).set({ id: userId, email })
    //         .then(this.$router.replace('home')).catch(err => console.log(err))
    //     }
    //     this.$router.replace('home')
    //   }).catch((err) => {
    //     console.error(err)
    //   })
    // },
    loginGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        const docRef = firebase.firestore().collection('user')
        const userId = result.user.uid
        const email = result.user.email
        if (docRef.doc(userId)) {
          return this.$router.push('/')
        } else {
          docRef.doc(userId).set({ id: userId, email })
            .then(this.$router.push('/')).catch(err => console.log(err))
        }
      }).catch((err) => {
        console.error(err)
      })
      console.log('User', firebase.auth().currentUser)
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  color: #333
  height: 100vh
  .formItem
    margin-bottom: 1rem
</style>
