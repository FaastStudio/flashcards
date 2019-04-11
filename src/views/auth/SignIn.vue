<template>
  <v-container fill-height>
    <v-layout
      align-center
      column
      justify-center
      fill-height
      v-if="!loadingSpinner"
    >
      <v-flex
        xs12
        md8
        lg4
      >
        <div style="text-align: center; margin-top: -3rem; margin-bottom: 3rem;">
          <h3>DEX Login</h3>
        </div>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn
            :disabled="!inputValid"
            class="mb-3"
            type="submit"
            color="primary"
            block
            round
          >LOG IN</v-btn>

          <span class="grey--text">OR REGISTER WITH A SOCIAL ACCOUNT</span>
          <v-layout
            row
            justify-space-between
            class="mt-3 mb-3"
          >
            <v-flex xs5>
              <div>
                <v-btn
                  @click="loginGoogle"
                  color="blue"
                  style="color: #fff;"
                  block
                  round
                >GOOGLE</v-btn>
              </div>
            </v-flex>
            <v-flex xs5>
              <div>
                <v-btn
                  type="button"
                  color="blue"
                  class="white--text"
                  block
                  round
                  disabled
                >TWITTER</v-btn>
              </div>
            </v-flex>
          </v-layout>
          <span class="grey--text text--center">OR REGISTER WITH EMAIL <router-link to="/login">HERE</router-link></span>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout v-else align-center justify-center>
      <v-flex xs12 md8 lg6>
        <div style="width: 100%; text-align: center;">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import firebase from 'firebase/app'
// import 'firebase/auth'
import { mapGetters } from 'vuex'
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
    async login () {
      await this.$auth.login(this.form.email, this.form.password)
    },
    async loginGoogle () {
      await this.$auth.loginGoogle()
    }
  },
  computed: {
    inputValid () {
      if (!!this.form.email && !!this.form.password) {
        return true
      } else return false
    },
    ...mapGetters('user', [
      'user'
    ]),
    ...mapGetters(['loadingSpinner']),
    nextRoute () {
      return this.$route.query.redirect || '/'
    }
  },
  watch: {
    user (auth) {
      if (auth) {
        this.$router.push(this.nextRoute)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.login {
  color: #333;
  height: 100vh;

  .formItem {
    margin-bottom: 1rem;
  }
}
</style>
