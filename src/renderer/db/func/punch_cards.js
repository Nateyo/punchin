let members = require('../models/members')
let punch_cards = require('../models/punch_cards')

export default {
  signed_in: function () {
    return new Promise(function (resolve, reject) {
      punch_cards.findAll({
        include: [{
          model: members,
          required: true
        }],
        group: 'member_id',
        order: [
          ['time', 'desc']
        ]
      }).then(punch_cards => {
        resolve(punch_cards)
      }).catch(error => {
        reject(error)
      })
    })
  },
  punch_status: function (member_id) {
    return new Promise(function (resolve, reject) {
      punch_cards.findAll({
        where: {
          member_id: member_id
        },
        order: [['time', 'desc']],
        limit: 1
      }).then(punch_cards => {
        if (punch_cards.length === 0) {
          // New member with no punch cards is automatically considered 'out'
          resolve('out')
        } else {
          if (punch_cards[0].action === 'in') {
            resolve('in')
          } else {
            resolve('out')
          }
        }
      })
    })
  },
  punch_in: function (member_id) {
    let punch_card = {
      action: 'in',
      member_id: member_id
    }
    return punch_cards.create(punch_card)
  },
  punch_out: function (member_id) {
    let punch_card = {
      action: 'out',
      member_id: member_id
    }
    return punch_cards.create(punch_card)
  },
  fetchAll: function (hide_password) {
    return new Promise(function (resolve, reject) {
      punch_cards.findAll().then(punch_cards => {
        resolve(punch_cards)
      })
    })
  }
}
