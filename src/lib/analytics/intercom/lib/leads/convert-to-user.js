const intercom = require('../api')
const {
  handleAction,
  handleRequest
} = require('../../helpers')

const convertLeadToUser = async (lead) => {
  const { email, user_id } = lead

  return handleRequest(intercom.leads.convert({
    contact: { email, user_id },
    user: { email }
  }))
}

module.exports = handleAction(convertLeadToUser)
