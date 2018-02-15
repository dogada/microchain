const debug = require('debug')('microchain:db')
const monk = require('monk')
const dbName = `mongo/microchain_${process.env.NODE_ENV || 'development'}`
debug('Using db', dbName)
const db = monk(dbName)

module.exports = {
  blocks: db.get('blocks', {castIds: false})
}
