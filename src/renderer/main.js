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

  if (!fs.existsSync('db')) {
    fs.mkdirSync('db')
    return Promise.all([
      require('./db/init').default()
    ])
  }

  // Test db connection
  var db = require('./db/db')
  db.authenticate().then(() => {
    console.log('Connection to DB is ok!')
  }).catch(err => {
    console.error('Connection to database failed:', err)
  })
}).then(() => {
  /* eslint-disable no-new */
  new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
  }).$mount('#app')
})
