import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vueScrollto from 'vue-scrollto'

Vue.use(vueScrollto)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
