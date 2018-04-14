var Sequelize = require('sequelize')
var db = require('../db')

var member = db.define(
  'member', {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
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
    administrator: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    created: {
      type: Sequelize.NOW,
      allowNull: false
    },
    updated: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    }
  }, 
  {
    underscored: true
})

module.exports = member
