import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateDeck from './views/Decks/CreateDeck.vue'
import ViewDeck from './views/Decks/ViewDeck.vue'
import ViewTodo from './views/Decks/ViewTodo.vue'
import PlayView from './views/PlayView.vue'
import PageNotFound from './views/PageNotFound.vue'
// import SignUp from './views/Auth/SignUp.vue'
const Profile = () => import('./views/User/Profile.vue')
const Settings = () => import('./views/User/Settings.vue')
const SignIn = () => import('./views/Auth/SignIn.vue')

// Toolbars
const ToolbarHome = () => import('@/components/ToolbarHome.vue')
const ToolbarBasic = () => import('@/components/ToolbarBasic.vue')
const ToolbarTodo = () => import('@/components/ToolbarTodo.vue')
const ToolbarGoHome = () => import('@/components/ToolbarGoHome.vue')
const ToolbarSubPage = () => import('@/components/ToolbarSubPage.vue')

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

  if (requiresAuth && !currentUser) next('/login')
  else if (loggedOut && currentUser) next('/') // cannot view this page while loggedIn
  else if (!requiresAuth && currentUser) next()
  else next()
})

export default router
