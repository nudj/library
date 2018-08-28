const intercom = require('../api')
const { handleAction, handleRequest } = require('../../helpers')

const getLeadBy = async filters => {
  const { contacts } = await handleRequest(intercom.leads.listBy(filters))

  // It seems Intercom has decided leads now don't always give you an array.
  return Array.isArray(contacts) ? contacts[0] : contacts
}

module.exports = handleAction(getLeadBy)
