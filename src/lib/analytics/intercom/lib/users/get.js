const intercom = require('../api')
const { handleAction, resolveRequest } = require('../../helpers')

const getUserBy = filters => resolveRequest(intercom.users.listBy(filters))

module.exports = handleAction(getUserBy)
