/* eslint-env mocha */

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const dirtyChai = require('dirty-chai')
const chaiAsPromised = require('chai-as-promised')
const proxyquire = require('proxyquire')

chai.use(sinonChai)
chai.use(dirtyChai)
chai.use(chaiAsPromised)
const expect = chai.expect

const promisifyStub = sinon.stub()
const trackStub = sinon.stub()
const identifyStub = sinon.stub()
const aliasStub = sinon.stub()
const setOnceStub = sinon.stub()
const setStub = sinon.stub()
const getDistinctIdStub = sinon.stub()
const registerOnceStub = sinon.stub()
const registerStub = sinon.stub()

const Mixpanel = proxyquire('../../../../../lib/analytics/adaptors/mixpanel/client', {
  '../../../helpers/mixpanel/promisify': (context, action) => (...args) => {
    promisifyStub(action)
    return context[action](...args)
  },
  './api': {
    track: trackStub,
    alias: aliasStub,
    identify: identifyStub,
    get_distinct_id: getDistinctIdStub,
    register_once: registerOnceStub,
    register: registerStub,
    people: {
      set: setStub,
      set_once: setOnceStub
    }
  }
})

describe('Mixpanel Client', () => {
  let mixpanel
  beforeEach(() => {
    promisifyStub.reset()
    trackStub.reset()
    identifyStub.reset()
    aliasStub.reset()
    setOnceStub.reset()
    setStub.reset()
    getDistinctIdStub.reset()
    registerOnceStub.reset()
    registerStub.reset()

    mixpanel = new Mixpanel({ app: 'hire' })
  })

  it('throws if no `app` is provided', () => {
    expect(() => new Mixpanel()).to.throw()
  })

  it('instantiates with optional `userTraits` and `eventProperties`', () => {
    const analytics = new Mixpanel({
      app: 'web',
      eventProperties: { isTrue: true },
      userTraits: { firstName: 'Andrew' }
    })

    expect(analytics.app).to.equal('web')
    expect(analytics.eventProperties).to.deep.equal({ isTrue: true })
    expect(analytics.traits).to.deep.equal({ firstName: 'Andrew' })
  })

  it('instantiates with `actions`, `properties` and `objects`', () => {
    expect(mixpanel.objects).to.exist()
    expect(mixpanel.actions).to.exist()
    expect(mixpanel.properties).to.exist()
  })

  describe('identify', () => {
    it('throws an error if no `id` is provided', async () => {
      try {
        await mixpanel.identify({})
        throw new Error('Not the correct error')
      } catch (error) {
        expect(error.message).to.not.equal('Not the correct error')
      }
    })

    it('calls the mixpanel api with the `id`', () => {
      const id = 'its_me'
      mixpanel.identify({ id })
      expect(identifyStub).to.have.been.calledWith(id)
    })

    describe('when `traits` are provided', () => {
      it('calls the updateIdentity method', async () => {
        const props = { id: 'its_me' }
        const traits = { firstName: 'River', lastName: 'Song' }
        const options = {}

        mixpanel.updateIdentity = sinon.stub()

        await mixpanel.identify(props, traits, options)
        expect(mixpanel.updateIdentity).to.have.been.calledWith(traits, options)
      })
    })
  })

  describe('alias', () => {
    it('throws an error if no `id` is provided', async () => {
      try {
        await mixpanel.alias({})
        throw new Error('Not the correct error')
      } catch (error) {
        expect(error.message).to.not.equal('Not the correct error')
      }
    })

    it('throws an error if no `alias` is provided', async () => {
      try {
        await mixpanel.alias({})
        throw new Error('Not the correct error')
      } catch (error) {
        expect(error.message).to.not.equal('Not the correct error')
      }
    })

    it('calls `mixpanel.alias`', async () => {
      await mixpanel.alias({ id: 'its_me', alias: 'also_me' })
      expect(aliasStub).to.have.been.calledWith('also_me', 'its_me')
    })

    describe('when `traits` are provided', () => {
      it('calls `updateIdentity` method', async () => {
        const props = { id: 'its_me', alias: 'also_me' }
        const traits = { firstName: 'River', lastName: 'Song' }
        const options = {}
        mixpanel.updateIdentity = sinon.stub()

        await mixpanel.alias(props, traits, options)
        expect(mixpanel.updateIdentity).to.have.been.calledWith(traits, options)
      })

      it('calls `mixpanel.alias`', async () => {
        const props = { id: 'its_me', alias: 'also_me' }
        const traits = { firstName: 'River', lastName: 'Song' }

        await mixpanel.alias(props, traits)
        expect(aliasStub).to.have.been.calledWith('also_me', 'its_me')
      })
    })
  })

  describe('getId', () => {
    it('calls the `mixpanel.get_distinct_id` method', async () => {
      await mixpanel.getId()
      expect(getDistinctIdStub).to.have.been.called()
    })
  })

  describe('updateIdentity', () => {
    it('updates the registered traits', async () => {
      const traits = { firstName: 'River', lastName: 'Song' }
      await mixpanel.updateIdentity(traits)
      expect(mixpanel.traits).to.deep.equal(traits)
    })

    it('calls the `mixpanel.set` method', async () => {
      const traits = { firstName: 'River', lastName: 'Song' }
      await mixpanel.updateIdentity(traits)
      expect(setStub).to.have.been.calledWith(traits)
    })

    it('promisifies `mixpanel.set`', async () => {
      const traits = { firstName: 'River', lastName: 'Song' }
      await mixpanel.updateIdentity(traits)
      expect(setStub).to.have.been.calledWith(traits)
      expect(promisifyStub).to.have.been.calledWith('set')
    })

    it('calls the `mixpanel.register` method', async () => {
      const traits = { firstName: 'River', lastName: 'Song' }
      await mixpanel.updateIdentity(traits)
      expect(registerStub).to.have.been.calledWith(traits)
    })

    describe('when `options.preserveTraits` is true', () => {
      it('updates the registered traits', async () => {
        const traits = { firstName: 'River', lastName: 'Song' }
        await mixpanel.updateIdentity(traits, { preserveTraits: true })
        expect(mixpanel.traits).to.deep.equal(traits)
      })

      it('does not overwrite existing traits', async () => {
        const traits = { firstName: 'River', lastName: 'Song' }

        mixpanel.traits = { lastName: 'Pond' }
        await mixpanel.updateIdentity(traits, { preserveTraits: true })
        expect(mixpanel.traits).to.deep.equal({
          firstName: 'River',
          lastName: 'Pond'
        })
      })

      it('calls the `mixpanel.set_once` method', async () => {
        const traits = { firstName: 'River', lastName: 'Song' }
        await mixpanel.updateIdentity(traits, { preserveTraits: true })
        expect(setOnceStub).to.have.been.calledWith(traits)
      })

      it('promisifies `mixpanel.set_once` with a callback', async () => {
        const traits = { firstName: 'River', lastName: 'Song' }
        await mixpanel.updateIdentity(traits, { preserveTraits: true })
        expect(promisifyStub).to.have.been.calledWith('set_once')
      })

      it('calls the `mixpanel.register_once` method', async () => {
        const traits = { firstName: 'River', lastName: 'Song' }

        mixpanel.traits = { lastName: 'Pond' }
        await mixpanel.updateIdentity(traits, { preserveTraits: true })
        expect(registerOnceStub).to.have.been.calledWith(mixpanel.traits)
      })
    })
  })

  describe('register', () => {
    it('updates the registered event properties', async () => {
      await mixpanel.register({ flavour: 'bubblegum' })
      expect(mixpanel.eventProperties).to.deep.equal({ flavour: 'bubblegum' })
    })

    it('calls the `mixpanel.register` method', async () => {
      await mixpanel.register({ flavour: 'bubblegum' })
      expect(registerStub).to.have.been.calledWith({ flavour: 'bubblegum' })
    })

    describe('when `options.preserveProperties` is true', () => {
      it('updates the registered event properties', async () => {
        const eventProperties = { flavour: 'bubblegum' }
        await mixpanel.register(eventProperties, { preserveProperties: true })
        expect(mixpanel.eventProperties).to.deep.equal({ flavour: 'bubblegum' })
      })

      it('does not overwrite existing traits', async () => {
        const eventProperties = { flavour: 'bubblegum', edible: true }

        mixpanel.eventProperties = { flavour: 'cherry', color: 'red' }
        await mixpanel.register(eventProperties, { preserveProperties: true })
        expect(mixpanel.eventProperties).to.deep.equal({
          flavour: 'cherry',
          color: 'red',
          edible: true
        })
      })

      it('calls the `mixpanel.register_once` method', async () => {
        const eventProperties = { flavour: 'bubblegum', edible: true }

        mixpanel.eventProperties = { flavour: 'cherry', color: 'red' }
        await mixpanel.register(eventProperties, { preserveProperties: true })
        expect(registerOnceStub).to.have.been.calledWith(mixpanel.eventProperties)
      })
    })
  })

  describe('track', () => {
    it('throws an error if no `object` is provided', async () => {
      const action = 'created'

      try {
        await mixpanel.track({ action })
        throw new Error('Not the correct error')
      } catch (error) {
        expect(error.message).to.not.equal('Not the correct error')
      }
    })

    it('throws an error if no `action` is provided', async () => {
      const object = 'Job'

      try {
        await mixpanel.track({ object })
        throw new Error('Not the correct error')
      } catch (error) {
        expect(error.message).to.not.equal('Not the correct error')
      }
    })

    it('calls the `mixpanel.track` method', async () => {
      const object = 'Job'
      const action = 'created'

      await mixpanel.track({ object, action })
      expect(trackStub).to.have.been.calledWith(`${object} ${action}`, {
        app: 'hire'
      })
    })

    it('promisifies the `mixpanel.track` method', async () => {
      const object = 'Job'
      const action = 'created'

      await mixpanel.track({ object, action })
      expect(promisifyStub).to.have.been.calledWith('track')
    })

    it('calls the `mixpanel.track` method with `this.eventProperties`', async () => {
      const object = 'Job'
      const action = 'created'

      mixpanel.eventProperties = { diamondsAre: 'forever' }
      await mixpanel.track({ object, action })
      expect(trackStub).to.have.been.calledWith(`${object} ${action}`, {
        app: 'hire',
        diamondsAre: 'forever'
      })
    })

    it('calls the `mixpanel.track` method with `this.properties`', async () => {
      const object = 'Job'
      const action = 'created'
      const properties = { lemonsAre: 'yellow' }

      mixpanel.eventProperties = { diamondsAre: 'forever' }
      await mixpanel.track({ object, action, properties })
      expect(trackStub).to.have.been.calledWith(`${object} ${action}`, {
        app: 'hire',
        lemonsAre: 'yellow',
        diamondsAre: 'forever'
      })
    })
  })
})
