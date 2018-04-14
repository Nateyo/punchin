import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Promise.resolve().then(() => {
  var fs = require('fs')
  if (!fs.existsSync("db")) {
    fs.mkdirSync("db")
    return Promise.all([
      require('./db/init').default(),
      require('./db/init_app').default()
    ])
  }
}).then(() => {
  /* eslint-disable no-new */
  new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
  }).$mount('#app')
})
