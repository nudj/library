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

const getOrCreateLead = proxyquire('../../../../../lib/analytics/intercom/lib/leads/get-or-create', {
  './get': fetchStub,
  './create': createStub
})

describe('intercom.getOrCreateLead', () => {
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
    describe('when the lead exists', () => {
      beforeEach(() => {
        fetchStub.returns(INTERCOM_RESPONSE)
      })

      it('calls `intercom.getLeadBy` method', async () => {
        await getOrCreateLead({ email })
        expect(fetchStub).to.have.been.calledWith({ email })
      })

      it('does not create a new lead', async () => {
        await getOrCreateLead({ email })
        expect(createStub).to.not.have.been.calledWith({ email })
      })

      it('returns the fetched contact', async () => {
        const result = await getOrCreateLead({ email })
        expect(result).to.equal(INTERCOM_RESPONSE)
      })
    })

    describe('when the lead does not exist', () => {
      it('calls `intercom.getLeadBy` method', async () => {
        await getOrCreateLead({ email })
        expect(fetchStub).to.have.been.calledWith({ email })
      })

      it('calls `intercom.createLead` method', async () => {
        await getOrCreateLead({ email })
        expect(createStub).to.have.been.calledWith({ email })
      })

      it('returns the created contact', async () => {
        createStub.returns(`${INTERCOM_RESPONSE}_CREATED`)
        const result = await getOrCreateLead({ email })
        expect(result).to.equal(`${INTERCOM_RESPONSE}_CREATED`)
      })
    })
  })
  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      fetchStub.throws('Super Explosive Intercom Action')
      expect(getOrCreateLead({ email })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      fetchStub.throws('Super Explosive Intercom Action')
      const result = await getOrCreateLead({ email })
      expect(result).to.be.null()
    })
  })
})
