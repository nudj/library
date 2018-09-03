const promisify = require('../../../helpers/mixpanel/promisify')
const mixpanel = require('./api')

const {
  eventObjects,
  eventActions,
  eventProperties: properties
} = require('../../../constants')
const {
  validateTrackArgs,
  validateAliasArgs,
  validateIdentifyArgs
} = require('../../../helpers/validation')

const alias = promisify(mixpanel, 'alias')
const track = promisify(mixpanel, 'track')
const setOnce = promisify(mixpanel.people, 'set_once')
const set = promisify(mixpanel.people, 'set')

class Mixpanel {
  constructor ({ app, userTraits = {}, eventProperties = {} }) {
    if (!app) throw new Error('Please provide an app name, E.g. `hire`')

    this.app = app
    this.objects = eventObjects
    this.actions = eventActions
    this.properties = properties
    this.traits = userTraits
    this.eventProperties = eventProperties
  }

  async alias (props, traits, options = {}) {
    validateAliasArgs(props)

    const response = await alias(props.alias, props.id)

    if (traits) {
      await this.updateIdentity(traits, options)
    }

    return response
  }

  async identify (props, traits, options) {
    validateIdentifyArgs(props)

    const identity = await mixpanel.identify(props.id)

    if (traits) {
      await this.updateIdentity(traits, options)
    }

    return identity
  }

  getId () {
    return mixpanel.get_distinct_id()
  }

  async updateIdentity (traits, options = {}) {
    if (options.preserveTraits) {
      this.traits = {
        ...traits,
        ...this.traits
      }
      await setOnce(this.traits)
      await mixpanel.register_once(this.traits)
    } else {
      this.traits = {
        ...this.traits,
        ...traits
      }
      await set(this.traits)
      await mixpanel.register(this.traits)
    }

    return this.traits
  }

  register (props, options = {}) {
    if (options.preserveProperties) {
      this.eventProperties = {
        ...props,
        ...this.eventProperties
      }

      return mixpanel.register_once(this.eventProperties)
    } else {
      this.eventProperties = {
        ...this.eventProperties,
        ...props
      }

      return mixpanel.register(this.eventProperties)
    }
  }

  track (props) {
    validateTrackArgs(props)

    const { object, action, properties = {} } = props
    const event = `${object} ${action}`

    return track(event, {
      app: this.app,
      ...this.traits,
      ...this.eventProperties,
      ...properties
    })
  }
}

module.exports = Mixpanel
