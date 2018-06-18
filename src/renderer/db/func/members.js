var bcrypt = require('bcryptjs')
let members = require('../models/members')

export default {
  add: function (member) {
    if (member.password) {
      member.password = bcrypt.hashSync(member.password, 10)
    }
    return members.create(member)
  },
  fetchAll: function (hide_password) {
    return new Promise(function (resolve, reject) {
      members.findAll().then(members => {
        members.forEach(member => {
          if (hide_password && member.password !== null) {
            member.password = 'hidden'
          }
        })

        resolve(members)
      })
    })
  }
}
