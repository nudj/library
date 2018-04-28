const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')

const formatUserDetails = ({ user_id, id, email }) => {
  return omitBy({ user_id, id, email }, isUndefined)
}

module.exports = formatUserDetails
