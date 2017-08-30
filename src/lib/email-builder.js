const MimeBuilder = require('mailbuild')
const omit = require('lodash/omit')

const emailBuilder = function (email) {
  const builder = new MimeBuilder('text/html')
  return builder
    .setHeader(omit(email, [email.body]))
    .setContent(email.body)
    .build()
}

module.exports = emailBuilder
