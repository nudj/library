/* eslint-env mocha */

const chai = require('chai')
const sinon = require('sinon')
const dirtyChai = require('dirty-chai')
const sinonChai = require('sinon-chai')
const proxyquire = require('proxyquire')
const expect = chai.expect

chai.use(dirtyChai)
chai.use(sinonChai)

const fetchStub = sinon.stub()
const createStub = sinon.stub()

const getOrCreateUser = proxyquire('../../../../../lib/analytics/intercom/lib/users/get-or-create', {
  './get': fetchStub,
  './create': createStub
})

describe('intercom.getOrCreateUser', () => {
  const email = 'test@example.com'
  const INTERCOM_RESPONSE = 'INTERCOM_RESPONSE'

  beforeEach(() => {
    fetchStub.reset()
    createStub.reset()
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
    describe('when the user exists', () => {
      beforeEach(() => {
        fetchStub.returns(INTERCOM_RESPONSE)
      })

      it('calls `intercom.getUserBy` method', async () => {
        await getOrCreateUser({ email })
        expect(fetchStub).to.have.been.calledWith({ email })
      })

      it('does not create a new user', async () => {
        await getOrCreateUser({ email })
        expect(createStub).to.not.have.been.calledWith({ email })
      })

      it('returns the fetched contact', async () => {
        const result = await getOrCreateUser({ email })
        expect(result).to.equal(INTERCOM_RESPONSE)
      })
    })

    describe('when the user does not exist', () => {
      it('calls `intercom.getUserBy` method', async () => {
        await getOrCreateUser({ email })
        expect(fetchStub).to.have.been.calledWith({ email })
      })

      it('calls `intercom.createUser` method', async () => {
        await getOrCreateUser({ email })
        expect(createStub).to.have.been.calledWith({ email })
      })

      it('returns the created contact', async () => {
        createStub.returns(`${INTERCOM_RESPONSE}_CREATED`)
        const result = await getOrCreateUser({ email })
        expect(result).to.equal(`${INTERCOM_RESPONSE}_CREATED`)
      })
    })
  })
  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      fetchStub.throws('Super Explosive Intercom Action')
      expect(getOrCreateUser({ email })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      fetchStub.throws('Super Explosive Intercom Action')
      const result = await getOrCreateUser({ email })
      expect(result).to.be.null()
    })
  })
})
