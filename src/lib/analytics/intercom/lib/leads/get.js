const intercom = require('../api')
const { handleAction, resolveRequest } = require('../../helpers')

const getLeadBy = async filters => {
  const { contacts } = await resolveRequest(intercom.leads.listBy(filters))
  return contacts[0]
}

module.exports = handleAction(getLeadBy)
