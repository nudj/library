const omit = require('lodash/omit')
const tagUser = require('./tag')
const intercom = require('../api')
const {
  handleAction,
  resolveRequest,
  formatUserDetails
} = require('../../helpers')

const updateUser = async ({ user, data }) => {
  const { tags } = data
  const response = await intercom.users.update({
    ...formatUserDetails(user),
    ...omit(data, ['tags'])
  })
  if (tags) {
    await tagUser({ user, tags })
  }

  return resolveRequest(response)
}

module.exports = handleAction(updateUser)
