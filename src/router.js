import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/auth/Login.vue'
import SignUp from './views/auth/SignUp.vue'

import Overview from './pages/Overview.vue'
import CreateDeck from './pages/CreateDeck.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/home',
          name: 'overview',
          component: Overview
        },
        {
          path: '/create',
          name: 'create-deck-page',
          component: CreateDeck
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser || true
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router
