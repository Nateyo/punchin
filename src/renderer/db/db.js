var Sequelize = require('sequelize')
var db = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: 'db/punchin.db',
  logging: false
})

module.exports = db
