/* eslint-env mocha */

const chai = require('chai')
const sinon = require('sinon')
const dirtyChai = require('dirty-chai')
const sinonChai = require('sinon-chai')
const proxyquire = require('proxyquire')
const expect = chai.expect

chai.use(dirtyChai)
chai.use(sinonChai)

const loggerStub = sinon.stub()

const handleAction = proxyquire('../../../../lib/analytics/intercom/helpers/handle-action', {
  '../../../logger': loggerStub
})

describe('handleAction', () => {
  let cachedIntercomEnabledEnv
  before(() => {
    cachedIntercomEnabledEnv = process.env.INTERCOM_ENABLED
    process.env.INTERCOM_ENABLED = 'true'
  })

  after(() => {
    process.env.INTERCOM_ENABLED = cachedIntercomEnabledEnv
  })

  it('passes the args to the action', () => {
    const stub = sinon.stub()
    const action = handleAction(stub)
    action({ type: 'test' }, 1234)
    expect(stub).to.have.been.calledWith({ type: 'test' }, 1234)
  })

  describe('when action succeeds', () => {
    it('returns the resolved value of the action', async () => {
      const action = handleAction(thing => {
        return Promise.resolve(`${thing}-result`)
      })
      const result = await action('test')
      expect(result).to.equal('test-result')
    })
  })

  describe('when action does not return anything', () => {
    it('returns null', async () => {
      const action = handleAction(thing => {
        // Do intercom stuff
      })
      const result = await action('test')
      expect(result).to.be.null()
    })
  })

  describe('when action throws an error', () => {
    beforeEach(() => {
      loggerStub.reset()
    })

    const error = new Error('Intercom Exploded')
    const badAction = (arg1, arg2) => {
      throw error
    }
    const intercomRequest = handleAction(badAction)

    it('catches the error and logs the action name and args', () => {
      intercomRequest('bad', 'intercom')
      expect(loggerStub).to.have.been.calledWith(
        'error', 'Intercom Error:', 'badAction', 'bad', 'intercom'
      )
    })

    it('returns null', async () => {
      const result = await intercomRequest()
      expect(result).to.be.null()
    })

    describe('when `error.body.errors` exists', () => {
      it('logs the `error.body.errors` value', () => {
        const badAction = (arg1, arg2) => {
          const error = new Error('Intercom Did A Bad')
          error.body = {}
          error.body.errors = [{ name: 'Intercom Definitely Exploded' }]
          throw error
        }
        const intercomRequest = handleAction(badAction)

        intercomRequest('half-life 3', 'confirmed')
        expect(loggerStub).to.have.been.calledWith(
          'error',
          'Intercom Error:',
          'badAction',
          'half-life 3',
          'confirmed',
          [{ name: 'Intercom Definitely Exploded' }]
        )
      })
    })

    describe('when `error.body.errors` does not exist', () => {
      it('logs the error', () => {
        const error = new Error('Intercom Did A Bad')
        const badAction = (arg1, arg2) => {
          throw error
        }
        const intercomRequest = handleAction(badAction)

        intercomRequest('Gavin', 'TheGhost')
        expect(loggerStub).to.have.been.calledWith(
          'error',
          'Intercom Error:',
          'badAction',
          'Gavin',
          'TheGhost',
          error
        )
      })
    })
  })
})
