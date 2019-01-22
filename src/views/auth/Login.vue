<template>
  <v-container>
    <v-layout xs12 sm10 md8 lg6>
      <v-flex>
        <v-form>
          <v-text-field type="email" label="Email" v-model="email.input" required></v-text-field>
          <v-text-field type="password" label="Password" v-model="password.input" required></v-text-field>
          <v-btn color="primary" block @click="login()">Log In</v-btn>
          <v-btn color="white" class="mt-3" @click="loginGoogle()" block>Log In with Google</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data () {
    return {
      name: 'login',
      email: {
        input: ''
      },
      password: {
        input: ''
      },
      errorList: [{ color: 'danger', err: 'Check your Input!', active: false }, { color: 'danger', err: 'Something went wrong! Try again later...', active: false }]
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email.input, this.password.input).then((result) => {
        const docRef = firebase.firestore().collection('user')
        const userId = result.user.uid
        const email = result.user.email
        if (docRef.doc(userId)) {
          return this.$router.replace('home')
        } else {
          docRef.doc(userId).set({ id: userId, email })
            .then(this.$router.replace('home')).catch(err => console.log(err))
        }
        this.$router.replace('home')
      }).catch((err) => {
        if (err) this.errorList[1].active = true
      })
    },
    loginGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        const docRef = firebase.firestore().collection('user')
        const userId = result.user.uid
        const email = result.user.email
        if (docRef.doc(userId)) {
          return this.$router.replace('home')
        } else {
          docRef.doc(userId).set({ id: userId, email })
            .then(this.$router.replace('home')).catch(err => console.log(err))
        }
        this.$router.replace('home')
      }).catch((err) => {
        if (err) this.errorList[1].active = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  color: #333;
  height: 100vh;
  .formItem {
    margin-bottom: 1rem;
  }
}
</style>
