/* eslint-env mocha */

const chai = require('chai')
const sinon = require('sinon')
const flatten = require('lodash/flatten')
const dirtyChai = require('dirty-chai')
const sinonChai = require('sinon-chai')
const proxyquire = require('proxyquire')
const expect = chai.expect

chai.use(dirtyChai)
chai.use(sinonChai)

const eventsCreateStub = sinon.stub()
const eventsListStub = sinon.stub()

const fetchStubCalls = (stub) => {
  const { args } = stub.getCalls()[0].proxy
  return flatten(args)
}

const logUserEvent = proxyquire('../../../../../lib/analytics/intercom/lib/users/log-event', {
  '../api': {
    events: {
      create: eventsCreateStub,
      listBy: eventsListStub
    }
  }
})

describe('intercom.logUserEvent', () => {
  const email = 'test@example.com'
  const INTERCOM_RESPONSE = 'INTERCOM_RESPONSE'

  beforeEach(() => {
    eventsCreateStub.reset()
    eventsListStub.reset()
  })

  let cachedIntercomEnabledEnv
  before(() => {
    cachedIntercomEnabledEnv = process.env.INTERCOM_ENABLED
    process.env.INTERCOM_ENABLED = 'true'
  })

  after(() => {
    process.env.INTERCOM_ENABLED = cachedIntercomEnabledEnv
  })

  describe('when request is successful', () => {
    it('calls `events.create` intercom method', async () => {
      await logUserEvent({
        user: { email },
        event: {
          name: 'test'
        }
      })
      expect(eventsCreateStub).to.have.been.called()
    })

    it('formats the event data', async () => {
      await logUserEvent({
        user: { email },
        event: {
          name: 'test'
        }
      })
      const event = fetchStubCalls(eventsCreateStub)[0]

      expect(event).to.have.property('created_at').to.be.a('string')
      expect(event).to.have.property('event_name').to.equal('test')
      expect(event).to.have.property('email').to.equal('test@example.com')
    })

    it('returns the created event', async () => {
      eventsCreateStub.returns(INTERCOM_RESPONSE)
      const result = await logUserEvent({
        user: { email },
        event: {
          name: 'test'
        }
      })
      expect(result).to.equal(INTERCOM_RESPONSE)
    })

    describe('when `unique` is set to true', () => {
      describe('when the event does not exist', () => {
        it('creates the event', async () => {
          eventsListStub.returns({ body: { events: [] } })
          await logUserEvent({
            user: { email },
            event: {
              unique: true,
              name: 'test'
            }
          })
          const calls = fetchStubCalls(eventsCreateStub)
          expect(eventsCreateStub).to.have.been.called()
          expect(calls[0]).to.have.property('event_name').to.equal('test')
        })
      })

      describe('when the event exists', () => {
        it('does not create the event', async () => {
          eventsListStub.returns({
            body: {
              events: [{
                event_name: 'test'
              }]
            }
          })
          await logUserEvent({
            user: { email },
            event: {
              unique: true,
              name: 'test'
            }
          })
          expect(eventsCreateStub).to.not.have.been.called()
        })
      })
    })
  })
  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      eventsCreateStub.throws('Super Explosive Intercom Action')
      expect(logUserEvent({
        user: { email },
        event: {
          name: 'test'
        }
      })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      eventsCreateStub.throws('Super Explosive Intercom Action')
      const result = await logUserEvent({
        user: { email },
        event: {
          name: 'test'
        }
      })
      expect(result).to.be.null()
    })
  })
})
