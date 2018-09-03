const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')

const mixpanel = require('./api')
const promisify = require('../../../helpers/mixpanel/promisify')
const {
  eventObjects,
  eventActions,
  eventProperties: properties
} = require('../../../constants')
const {
  validateTrackArgs,
  validateIdentifyArgs
} = require('../../../helpers/validation')

const alias = promisify(mixpanel, 'alias')
const track = promisify(mixpanel, 'track')
const set = promisify(mixpanel.people, 'set')
const setOnce = promisify(mixpanel.people, 'set_once')

class Mixpanel {
  constructor ({ app, distinctId, userTraits = {}, eventProperties = {} }) {
    if (!app) throw new Error('Please provide an app name, E.g. `hire`')

    if (distinctId) {
      this.distinctId = distinctId
    }

    this.app = app
    this.objects = eventObjects
    this.actions = eventActions
    this.properties = properties
    this.eventProperties = eventProperties
    this.traits = userTraits
    this.handleEventPropertiesChange = null
  }

  async alias (props, traits, options) {
    if (!props.alias) {
      throw new Error('`analytics.alias` has failed. Please provide an `alias` for an existing user')
    }

    const aliased = await alias(this.distinctId, props.alias)
    this.distinctId = props.alias

    if (traits) {
      await this.updateIdentity(traits, options)
    }

    return aliased
  }

  async identify (props, traits, options = {}) {
    validateIdentifyArgs(props)

    this.distinctId = props.id

    if (traits) {
      await this.updateIdentity(traits, options)
    }

    return this.distinctId
  }

  getId () {
    return this.distinctId
  }

  async updateIdentity (traits, options = {}) {
    if (options.preserveTraits) {
      this.traits = {
        ...traits,
        ...this.traits
      }

      this.eventProperties = {
        ...traits,
        ...this.eventProperties
      }

      await setOnce(this.distinctId, this.traits)
    } else {
      this.traits = {
        ...this.traits,
        ...traits
      }
      this.eventProperties = {
        ...this.eventProperties,
        ...traits
      }

      await set(this.distinctId, this.traits)
    }

    typeof this.handleEventPropertiesChange === 'function' && this.handleEventPropertiesChange(this.eventProperties)

    return this.traits
  }

  register (props, options = {}) {
    if (options.preserveProperties) {
      this.eventProperties = {
        ...props,
        ...this.eventProperties
      }
    } else {
      this.eventProperties = {
        ...this.eventProperties,
        ...props
      }
    }

    typeof this.handleEventPropertiesChange === 'function' && this.handleEventPropertiesChange(this.eventProperties)

    return this.eventProperties
  }

  async track (props) {
    validateTrackArgs(props)

    const { object, action, properties = {} } = props
    const event = `${object} ${action}`

    return track(event, omitBy({
      app: this.app,
      distinct_id: this.distinctId,
      ...this.traits,
      ...this.eventProperties,
      ...properties
    }, isUndefined))
  }

  onEventPropertiesChange (callback) {
    this.handleEventPropertiesChange = callback
  }
}

module.exports = Mixpanel
