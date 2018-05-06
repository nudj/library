const omit = require('lodash/omit')
const tagLead = require('./tag')
const { leads } = require('../api')
const { handleAction, resolveRequest } = require('../../helpers')

const createLead = async (data) => {
  const { tags } = data
  if (!tags) return resolveRequest(leads.create(data))

  const leadData = omit(data, ['tags'])
  const lead = await resolveRequest(leads.create(leadData))
  await tagLead({ lead, tags })
  return lead
}

module.exports = handleAction(createLead)
