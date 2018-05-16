const omit = require('lodash/omit')
const tagUser = require('./tag')
const intercom = require('../api')
const { handleAction, handleRequest } = require('../../helpers')

const createUser = async (data) => {
  const { tags } = data
  if (!tags) return handleRequest(intercom.users.create(data))

  const userData = omit(data, ['tags'])
  const user = await handleRequest(intercom.users.create(userData))
  await tagUser({ user, tags })
  return user
}

module.exports = handleAction(createUser)
