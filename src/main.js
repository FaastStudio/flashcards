import Vue from 'vue'
import './plugins/vuetify'
import './plugins/longPress'
// import VueI18n from 'vue-i18n'
import './assets/stylus/main.styl'
import router from './router'
import store from './store'
import VueMathjax from 'vue-mathjax'
import './registerServiceWorker'
import 'material-icons/iconfont/material-icons.css' // Material Icons
import App from './App.vue'
import firebaseAuth from './plugins/firebaseAuth'

Vue.config.productionTip = false

// Vue.use(VueI18n)

// const i18n = new VueI18n({})

Vue.use(VueMathjax)
Vue.use(firebaseAuth)

new Vue({
  // i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
