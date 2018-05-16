const intercom = require('../api')
const { handleAction, resolveRequest } = require('../../helpers')

const getCompanyBy = filter => resolveRequest(intercom.companies.listBy(filter))

module.exports = handleAction(getCompanyBy)
