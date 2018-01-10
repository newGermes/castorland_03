import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vueScrollto from 'vue-scrollto'
import myFilters from './util/filters'

Vue.use(vueScrollto)
Vue.use(myFilters)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
