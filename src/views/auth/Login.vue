<template>
  <el-row type="flex" justify="center" align="middle" :gutter="10" class="login">
    <el-col>
      <el-row type="flex" style="flex-direction: column; text-align: center;">
        <h2 class="formItem">Login</h2>
        <el-input class="formItem" placeholder="Your Email" type="email" v-model="email.input"></el-input>
        <el-input class="formItem" placeholder="Password" type="password" v-model="password.input"></el-input>
        <el-button class="formItem" type="primary" @click="login()">Login</el-button>
        <el-button class="formItem" @click="loginGoogle()" style="margin: 0; margin-bottom: 1rem;">Login with Google</el-button>
        <router-link tag="span" to="/signup">No account yet? Sign Up here!</router-link>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data () {
    return {
      name: 'login',
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
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email.input, this.password.input)
        .then(
          (user) => {
            if (user) this.$router.push('/home')
          },
          (err) => {
            if (err) {
              this.errorList[0].active = true
            }
          }
        )
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
