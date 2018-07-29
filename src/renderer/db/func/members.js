var bcrypt = require('bcryptjs')
let members = require('../models/members')

export default {
  add: function (member) {
    if (member.password) {
      // TODO: Probably increase the number of rounds, since this is a desktop application
      member.password = bcrypt.hashSync(member.password, 10)
    }
    return members.create(member)
  },
  update: function (member, fields) {
    if (fields.includes('password')) {
      member.password = bcrypt.hashSync(member.password, 10)
    }

    return member.save({
      fields: fields
    })
  },
  fetchSome: function (ids, hide_password) {
    return new Promise(function (resolve, reject) {
      members.findAll({
        where: {
          id: ids
        }
      }).then(members => {
        members.forEach(member => {
          if (hide_password && member.password !== null) {
            member.password = 'hidden'
          }
          if (member.middle_name == null) {
            member.middle_name = ''
          }
        })

        resolve(members)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  fetchAll: function (hide_password) {
    return new Promise(function (resolve, reject) {
      members.findAll().then(members => {
        members.forEach(member => {
          if (hide_password && member.password !== null) {
            member.password = 'hidden'
          }
          if (member.middle_name == null) {
            member.middle_name = ''
          }
        })

        resolve(members)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  verify: function (member_id, password) {
    return new Promise(function (resolve, reject) {
      members.find({
        where: {
          id: member_id
        },
        limit: 1
      }).then(member => {
        resolve(bcrypt.compareSync(password, member.password))
      }).catch(error => {
        reject(error)
      })
    })
  }
}
