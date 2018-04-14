/* Initialize the database */

var Sequelize = require('sequelize')

export default function() {
  return Promise.all([
    require('./models/member'),
    require('./models/punch_card')
  ].map((o) => o.sync({
    force: true
  }))).then(function() {
    return require('./init_data').default()
  }).then(function() {
    console.log("DB Init OK!")
  }).catch(function(err) {
    console.error(err)
  })
}
