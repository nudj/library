const omit = require('lodash/omit')
const tagUser = require('./tag')
const { users } = require('../api')
const { handleAction, resolveRequest } = require('../../helpers')

const createUser = async (data) => {
  const { tags } = data
  if (!tags) return resolveRequest(users.create(data))

  const userData = omit(data, ['tags'])
  const user = await resolveRequest(users.create(userData))
  await tagUser({ user, tags })
  return user
}

module.exports = handleAction(createUser)
