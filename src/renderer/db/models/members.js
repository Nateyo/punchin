var Sequelize = require('sequelize')
var db = require('../db')

var members = db.define(
  'members', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    middle_name: Sequelize.STRING,
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: Sequelize.STRING,
    picture: Sequelize.BLOB,
    is_administrator: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    underscored: true
  })

module.exports = members
