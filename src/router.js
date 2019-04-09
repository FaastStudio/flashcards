import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import Router from 'vue-router'
import Home from './views/Home.vue'
const CreateDeck = () => require('./views/Decks/CreateDeck.vue')
const ViewDeck = () => require('./views/Decks/ViewDeck.vue')
const ViewTodo = () => require('./views/Decks/ViewTodo.vue')
const PlayView = () => require('./views/PlayView.vue')
const PageNotFound = () => require('./views/PageNotFound.vue')
const SignIn = () => require('./views/Auth/SignIn.vue')
// import SignUp from './views/Auth/SignUp.vue'
const Profile = () => require('./views/User/Profile.vue')
const Settings = () => require('./views/User/Settings.vue')

// Toolbars
const ToolbarHome = () => require('@/components/ToolbarHome.vue')
const ToolbarBasic = () => require('@/components/ToolbarBasic.vue')
const ToolbarTodo = () => require('@/components/ToolbarTodo.vue')
const ToolbarGoHome = () => require('@/components/ToolbarGoHome.vue')
const ToolbarSubPage = () => require('@/components/ToolbarSubPage.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: '404',
      component: {
        default: PageNotFound,
        toolbar: ToolbarHome
      }
    },
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        toolbar: ToolbarHome
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/deck/create',
      name: 'createDeck',
      components: {
        default: CreateDeck,
        toolbar: ToolbarGoHome
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create/:deckId',
      name: 'addCard',
      components: {
        default: CreateDeck,
        toolbar: ToolbarSubPage
      }
    },
    {
      path: '/deck/:deckId',
      name: 'editDeck',
      components: {
        default: ViewDeck,
        toolbar: ToolbarSubPage
      },
      meta: {
        requiresAuth: false,
        loggedOut: false
      }
    },
    {
      path: '/play/:deckId',
      name: 'playView',
      components: {
        default: PlayView
      },
      meta: {
        requiresAuth: false,
        loggedOut: false
      }
    },
    {
      path: '/todo/:deckId',
      name: 'editTodo',
      components: {
        default: ViewTodo,
        toolbar: ToolbarTodo
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        default: Profile,
        toolbar: ToolbarHome
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      components: {
        default: Settings,
        toolbar: ToolbarHome
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: SignIn,
        toolbar: ToolbarBasic
      },
      meta: {
        loggedOut: true
      }
    }
    // {
    //   path: '/register',
    //   name: 'register',
    //   components: {
    //     default: SignUp,
    //     toolbar: ToolbarBasic
    //   },
    //   meta: {
    //     loggedOut: true
    //   }
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const loggedOut = to.matched.some(record => record.meta.loggedOut)
  console.log(currentUser)
  if (requiresAuth && !currentUser) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  if (currentUser && loggedOut) {
    return next('/')
  }

  next()
})

export default router
