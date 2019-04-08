<template>
  <v-container fill-height>
    <v-layout align-center column justify-center fill-height>
      <div>
        <v-flex xs12 md8 lg4>
          <div style="text-align: center; margin-top: -3rem; margin-bottom: 3rem;">
            <h3>DEX Login</h3>
          </div>
          <v-form @submit.prevent="login">
            <v-text-field v-model="form.email" label="Email" type="email" required></v-text-field>
            <v-text-field v-model="form.password" label="Password" type="password" required></v-text-field>
            <v-btn :disabled="!inputValid" class="mb-3" type="submit" color="primary" block round>LOG IN</v-btn>

            <span class="grey--text">OR REGISTER WITH A SOCIAL ACCOUNT</span>
            <v-layout row justify-space-between class="mt-3">
              <v-flex xs5>
                <div>
                  <v-btn @click="loginGoogle" type="button" color="white" block round>GOOGLE</v-btn>
                </div>
              </v-flex>
              <v-flex xs5>
                <div>
                  <v-btn type="button" color="blue" class="white--text" block round>TWITTER</v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </div>
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
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).then((result) => {
        if (result.user) {
          return this.$router.push({
            path: this.$route.query.redirect || '/'
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    loginGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((result) => {
        const docRef = firebase.firestore().collection('user')
        const userId = result.user.uid
        const email = result.user.email
        if (docRef.doc(userId)) {
          return this.$router.push({
            path: this.$route.query.redirect || '/'
          })
        } else {
          docRef.doc(userId).set({ id: userId, email })
            .then(() => {
              this.$router.push({
                path: this.$route.query.redirect || '/'
              })
            })
            .catch(err => console.log(err))
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  },
  computed: {
    inputValid () {
      if (!!this.form.email && !!this.form.password) {
        return true
      } else return false
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
