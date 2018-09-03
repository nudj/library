const promiseNoop = require('../../../promise-noop')
const {
  eventObjects,
  eventActions,
  eventProperties
} = require('../../../constants')

/* For compatibility when analytics is disabled */
class DisabledAdaptor {
  constructor () {
    this.objects = eventObjects
    this.actions = eventActions
    this.properties = eventProperties

    this.track = promiseNoop
    this.alias = promiseNoop
    this.identify = promiseNoop
    this.updateIdentity = promiseNoop
    this.register = promiseNoop
    this.getId = promiseNoop
  }
}

module.exports = DisabledAdaptor
