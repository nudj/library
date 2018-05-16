const intercom = require('../api')
const { handleAction, handleRequest } = require('../../helpers')

const createCompany = data => handleRequest(intercom.companies.create(data))

module.exports = handleAction(createCompany)
