const omit = require('lodash/omit')
const tagUser = require('./tag')
const intercom = require('../api')
const { handleAction, resolveRequest } = require('../../helpers')

const createUser = async (data) => {
  const { tags } = data
  if (!tags) return resolveRequest(intercom.users.create(data))

  const userData = omit(data, ['tags'])
  const user = await resolveRequest(intercom.users.create(userData))
  await tagUser({ user, tags })
  return user
}

module.exports = handleAction(createUser)
