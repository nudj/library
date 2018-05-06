const getLeadBy = require('./get')
const createLead = require('./create')
const { handleAction, formatUserDetails } = require('../../helpers')

const getOrCreateLead = async data => {
  let lead = await getLeadBy(formatUserDetails(data))
  if (!lead) {
    lead = await createLead(data)
  }
  return lead
}

module.exports = handleAction(getOrCreateLead)
