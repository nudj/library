const intercom = require('../api')
const getLeadBy = require('./get')
const {
  handleAction,
  resolveRequest,
  formatUserDetails
} = require('../../helpers')

const convertLeadToUser = async (lead) => {
  const { email, user_id } = await getLeadBy(formatUserDetails(lead))

  return resolveRequest(intercom.leads.convert({
    contact: { email, user_id },
    user: { email }
  }))
}

module.exports = handleAction(convertLeadToUser)
