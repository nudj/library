const intercom = require('../api')
const getUserBy = require('./get')
const {
  handleAction,
  formatUserDetails
} = require('../../helpers')

const tagUser = async ({ user, tags }) => {
  const intercomUser = await getUserBy(formatUserDetails(user))
  await Promise.all(tags.map(tag => intercom.tags.tag({
    name: tag,
    users: [{ id: intercomUser.id }]
  })))

  return intercomUser
}

module.exports = handleAction(tagUser)
