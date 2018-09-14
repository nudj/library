const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')

function omitUndefined (object) {
  return omitBy(object, isUndefined)
}

module.exports = omitUndefined
