const format = require('date-fns/format')
const isUndefined = require('lodash/isUndefined')
const omitBy = require('lodash/omitBy')
const find = require('lodash/find')
const intercom = require('../api')
const {
  handleAction,
  formatUserDetails
} = require('../../helpers')

const getTimestampInSeconds = () => format(new Date(), 'X')

const logUserEvent = async ({ user, event }) => {
  const { name, metadata, unique } = event
  const userData = formatUserDetails(user)

  if (unique) {
    const { body } = await intercom.events.listBy({
      type: 'user',
      ...userData
    })
    const existingEvent = find(body.events, { event_name: name })
    if (existingEvent) return existingEvent
  }

  const eventData = omitBy({
    created_at: getTimestampInSeconds(),
    event_name: name,
    metadata,
    ...userData
  }, isUndefined)

  return intercom.events.create(eventData)
}

module.exports = handleAction(logUserEvent)
