const intercom = require('../api')
const getLeadBy = require('./get')
const {
  handleAction,
  formatUserDetails
} = require('../../helpers')

const tagLead = async ({ lead, tags }) => {
  const { email, id } = formatUserDetails(lead)

  let userId = id
  let intercomLead = lead
  if (!userId) {
    intercomLead = await getLeadBy({ email })
    userId = intercomLead.id
  }

  await Promise.all(tags.map(tag => intercom.tags.tag({
    name: tag,
    users: [{ id: userId }]
  })))

  return intercomLead
}

module.exports = handleAction(tagLead)
