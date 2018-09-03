const values = require('lodash/values')
const camelCase = require('lodash/camelCase')
const { eventObjects, eventActions } = require('../constants')

const validObjects = values(eventObjects)

const isValidAction = (object, action) => {
  const eventObject = camelCase(object)
  if (!action || !object || !eventActions[eventObject]) return false

  const validActions = values(eventActions[eventObject])
  return validActions.includes(action)
}

const isID = id => {
  return typeof id === 'string' || typeof id === 'number'
}

const validateTrackArgs = ({ properties, object, action }) => {
  if (!validObjects.includes(object)) {
    throw new Error('`analytics.track` has failed. Please provide a valid object for this event. E.g., `analytics.objects.job`')
  }
  if (!isValidAction(object, action)) {
    throw new Error('`analytics.track` has failed. Please provide a valid action for this event. E.g., `analytics.actions.job.created`')
  }
}

const validateIdentifyArgs = ({ id }) => {
  if (!isID(id)) throw new Error('`analytics.identify` has failed. Please provide an `id` to identify')
}

const validateAliasArgs = ({ id, alias }) => {
  if (!isID(id)) throw new Error('`analytics.alias` has failed. Please provide an `id` for an existing user')
  if (!isID(alias)) throw new Error('`analytics.alias` has failed. Please provide an `alias`')
}

module.exports = {
  validateAliasArgs,
  validateIdentifyArgs,
  validateTrackArgs
}
