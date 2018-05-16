const omit = require('lodash/omit')
const tagUser = require('./tag')
const intercom = require('../api')
const {
  handleAction,
  handleRequest,
  formatUserDetails
} = require('../../helpers')

const updateUser = async ({ lead, data }) => {
  const { tags } = data
  const response = await intercom.leads.update({
    ...formatUserDetails(lead),
    ...omit(data, ['tags'])
  })
  if (tags) {
    await tagUser({ lead, tags })
  }

  return handleRequest(response)
}

module.exports = handleAction(updateUser)
