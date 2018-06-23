import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import moment from 'moment'

import App from './App'
import router from './router'
import store from './store'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Vuetify)

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(value).format('hh:mm a')
  }
})

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
