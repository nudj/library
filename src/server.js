// functions that are only relevant on the server

const emailBuilder = require('./lib/email-builder')
const cacheReturnTo = require('./lib/cache-return-to')
const Analytics = require('./lib/analytics/server')
const intercom = require('./lib/analytics/intercom')

module.exports = {
  emailBuilder,
  cacheReturnTo,
  Analytics,
  intercom
}
