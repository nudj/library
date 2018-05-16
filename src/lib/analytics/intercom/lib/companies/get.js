const intercom = require('../api')
const { handleAction, handleRequest } = require('../../helpers')

const getCompanyBy = filter => handleRequest(intercom.companies.listBy(filter))

module.exports = handleAction(getCompanyBy)
