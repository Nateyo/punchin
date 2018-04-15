var Sequelize = require('sequelize')
var db = require('../db')
var members = require('./members')

var punch_cards = db.define(
  'punch_cards', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    action: {
      type: Sequelize.ENUM,
      values: [
        'in',
        'out',
        'absent'
      ],
      allowNull: false
    },
    time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    }
  },
  {
    underscored: true,
    timestamps: false
  })

// This should add a member_id column to punch_card, this may need to be defined somewhere else...
punch_cards.belongsTo(members)

module.exports = punch_cards