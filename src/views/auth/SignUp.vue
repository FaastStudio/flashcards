<template>
  <vs-row class="login" vs-w="12" vs-type="flex" vs-justify="center" vs-align="center">
    <vs-col class="column" vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="8" vs-lg="4">
      <h2 style="margin-bottom: 1rem;">Sign Up</h2>
      <vs-input v-model="email.input" style="margin-bottom: 1rem;" type="email" placeholder="Your Email" label="Email" required></vs-input>
      <vs-input v-model="password.input" style="margin-bottom: 1rem;" type="password" placeholder="Enter Password" label="Password" required></vs-input>
      <vs-button @click="signup()" style="width: 200px; margin-bottom: 0.5rem;">Sign Up</vs-button>
      <vs-button @click="signupGoogle()" type="line" color="#4885ed" style="width: 200px; margin-bottom: 0.5rem;">SignUp with Google</vs-button>
      <vs-button type="flat" color="#AC1CF4"><router-link tag="span" to="/login">You already have an account? <br> Log In here!</router-link></vs-button>
      <vs-alert v-for="(err, index) in errorList" :key="index" :color="err.color" :active.sync="err.active" closable close-icon="cancel">{{ err.err }}</vs-alert>
    </vs-col>
  </vs-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data () {
    return {
      name: 'signup',
      email: {
        input: '',
        color: ''
      },
      password: {
        input: '',
        color: ''
      },
      errorList: [{ color: 'danger', err: 'Check your Input!', active: false }, { color: 'danger', err: 'Something went wrong! Try again later...', active: false }]
    }
  },
  methods: {
    signup () {
      firebase.auth().createUserWithEmailAndPassword(this.email.input, this.password.input)
        .then(
          (user) => {
            if (user) this.$router.push('/home')
          }
        )
        .catch(
          (err) => {
            if (err) {
              this.errorList[0].active = true
            }
          }
        )
    },
    signupGoogle () {
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
  height: 100vh;
  .column {
    flex-direction: column;
  }
}
</style>
