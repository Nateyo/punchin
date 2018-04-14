var Sequelize = require('sequelize')
var db = require('../db')
var member = require('./member')

var punch_card = db.define(
  'punch_card', {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    action: {
      type: Sequelize.ENUM,
      values: [
        "in",
        "out",
        "absent"
      ],
      allowNull: false
    },
    time: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, 
  {
    underscored: true
})

//This should add a member_id column to punch_card, this may need to be defined somewhere else...
punch_card.belongsTo(member)

module.exports = punch_card
