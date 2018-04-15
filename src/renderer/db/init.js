/* Initialize the database */

export default function () {
  return Promise.all([
    require('./models/members'),
    require('./models/punch_cards')
  ].map((o) => o.sync({
    force: true
  }))).then(function () {
    return require('./init_data').default()
  }).then(function () {
    console.log('DB Init OK!')
  }).catch(function (err) {
    console.error(err)
  })
}
