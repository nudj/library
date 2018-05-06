const Intercom = require('intercom-client')

module.exports = new Intercom.Client({
  token: process.env.INTERCOM_ACCESS_TOKEN
})
