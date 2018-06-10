var bcrypt = require('bcryptjs')
let members = require('../models/members')

var member_func = {
  add: function (member) {
    if (member.password) {
      member.password = bcrypt.hashSync(member.password, 10)
    }
    return members.create(member)
  }
}

module.exports = member_func
