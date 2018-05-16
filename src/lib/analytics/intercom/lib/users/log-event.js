const format = require('date-fns/format')
const isUndefined = require('lodash/isUndefined')
const omitBy = require('lodash/omitBy')
const intercom = require('../api')
const {
  handleAction,
  formatUserDetails
} = require('../../helpers')

const getTimestampInSeconds = () => format(new Date(), 'X')

const logUserEvent = ({ user, event }) => {
  const { name, metadata } = event
  const eventData = omitBy({
    created_at: getTimestampInSeconds(),
    event_name: name,
    metadata,
    ...formatUserDetails(user)
  }, isUndefined)
  return intercom.events.create(eventData)
}

module.exports = handleAction(logUserEvent)
