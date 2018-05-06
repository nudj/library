const { companies } = require('../api')
const { handleAction, resolveRequest } = require('../../helpers')

const getCompanyBy = filter => resolveRequest(companies.listBy(filter))

module.exports = handleAction(getCompanyBy)
