const isNil = require('lodash/isNil')
const logger = require('../../../logger')

const handleAction = (action) => async (...args) => {
  if (process.env.INTERCOM_ENABLED !== 'true') return null
  try {
    const result = await action(...args)
    return !isNil(result) ? result : null
  } catch (error) {
    const errorInfo = (error.body && error.body.errors) || error
    logger('error', 'Intercom Error:', action.name, ...args, errorInfo)
    return null
  }
}

module.exports = handleAction
