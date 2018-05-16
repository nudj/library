const intercom = require('../api')
const getLeadBy = require('./get')
const {
  handleAction,
  formatUserDetails
} = require('../../helpers')

const tagLead = async ({ lead, tags }) => {
  const intercomLead = await getLeadBy(formatUserDetails(lead))
  await Promise.all(tags.map(tag => intercom.tags.tag({
    name: tag,
    users: [{ id: intercomLead.id }]
  })))

  return intercomLead
}

module.exports = handleAction(tagLead)
