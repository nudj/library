const { users } = require('../api')
const { handleAction, resolveRequest } = require('../../helpers')

const getUserBy = filters => resolveRequest(users.listBy(filters))

module.exports = handleAction(getUserBy)
