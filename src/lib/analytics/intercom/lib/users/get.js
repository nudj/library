const intercom = require('../api')
const { handleAction, handleRequest } = require('../../helpers')

const getUserBy = filters => handleRequest(intercom.users.listBy(filters))

module.exports = handleAction(getUserBy)
