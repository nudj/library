const getUserBy = require('./get')
const createUser = require('./create')
const { handleAction, formatUserDetails } = require('../../helpers')

const getOrCreateUser = async data => {
  let user = await getUserBy(formatUserDetails(data))
  if (!user) {
    user = await createUser(data)
  }
  return user
}

module.exports = handleAction(getOrCreateUser)
