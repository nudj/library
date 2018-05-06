const { companies } = require('../api')
const { handleAction, resolveRequest } = require('../../helpers')

const createCompany = data => resolveRequest(companies.create(data))

module.exports = handleAction(createCompany)
