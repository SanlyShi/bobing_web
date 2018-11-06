// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Axios from "axios"
import axios from './assets/js/http'
import urlstate from './assets/js/state'
import * as filters from './assets/js/filters'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.prototype.$urlstate=urlstate
Vue.prototype.$axios=Axios
Vue.prototype.filters=filters
Vue.config.productionTip = false
Vue.use(Mint)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
