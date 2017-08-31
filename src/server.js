// functions that are only relevant on the server

const emailBuilder = require('./lib/email-builder')
const cacheReturnTo = require('./lib/cache-return-to')

module.exports = {
  emailBuilder,
  cacheReturnTo
}
