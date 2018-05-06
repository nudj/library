const { leads } = require('../api')
const { handleAction, resolveRequest } = require('../../helpers')

const getLeadBy = async filters => {
  const { contacts } = await resolveRequest(leads.listBy(filters))
  return contacts[0]
}

module.exports = handleAction(getLeadBy)
