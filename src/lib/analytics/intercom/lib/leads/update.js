const omit = require('lodash/omit')
const tagUser = require('./tag')
const { leads } = require('../api')
const {
  handleAction,
  resolveRequest,
  formatUserDetails
} = require('../../helpers')

const updateUser = async ({ lead, data }) => {
  const { tags } = data
  const response = await leads.update({
    ...formatUserDetails(lead),
    ...omit(data, ['tags'])
  })
  if (tags) {
    await tagUser({ lead, tags })
  }

  return resolveRequest(response)
}

module.exports = handleAction(updateUser)
