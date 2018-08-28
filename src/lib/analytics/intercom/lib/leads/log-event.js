const format = require('date-fns/format')
const isUndefined = require('lodash/isUndefined')
const omitBy = require('lodash/omitBy')
const find = require('lodash/find')

const intercom = require('../api')
const { handleAction } = require('../../helpers')

const formatLeadDetails = lead => {
  if (lead.id) return { id: lead.id }
  return { email: lead.email }
}

const getTimestampInSeconds = () => format(new Date(), 'X')

const logLeadEvent = async ({ lead, event }) => {
  const { name, metadata, unique } = event
  const leadDetails = formatLeadDetails(lead)
  if (!leadDetails.id && !leadDetails.email) throw new Error('Lead not found', lead)

  if (unique) {
    const { body } = await intercom.events.listBy({
      type: 'user',
      ...leadDetails
    })
    const existingEvent = find(body.events, { event_name: name })
    if (existingEvent) return existingEvent
  }

  const eventData = omitBy({
    created_at: getTimestampInSeconds(),
    event_name: name,
    metadata,
    ...leadDetails
  }, isUndefined)

  return intercom.events.create(eventData)
}

module.exports = handleAction(logLeadEvent)
