const omit = require('lodash/omit')
const tagLead = require('./tag')
const intercom = require('../api')
const { handleAction, handleRequest } = require('../../helpers')

const createLead = async (data) => {
  const { tags } = data
  if (!tags) return handleRequest(intercom.leads.create(data))

  const leadData = omit(data, ['tags'])
  const lead = await handleRequest(intercom.leads.create(leadData))
  await tagLead({ lead, tags })
  return lead
}

module.exports = handleAction(createLead)
