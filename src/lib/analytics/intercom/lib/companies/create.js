const intercom = require('../api')
const { handleAction, resolveRequest } = require('../../helpers')

const createCompany = data => resolveRequest(intercom.companies.create(data))

module.exports = handleAction(createCompany)
