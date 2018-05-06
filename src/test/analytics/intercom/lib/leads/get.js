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

const getLeadBy = proxyquire('../../../../../lib/analytics/intercom/lib/leads/get', {
  '../api': {
    leads: {
      listBy: fetchStub
    }
  }
})

describe('intercom.getLeadBy', () => {
  const email = 'test@example.com'
  const INTERCOM_RESPONSE = 'INTERCOM_RESPONSE'

  beforeEach(() => {
    fetchStub.reset()
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
    it('calls `leads.listBy` intercom method', async () => {
      await getLeadBy({ email })
      expect(fetchStub).to.have.been.calledWith({ email })
    })

    it('returns the fetched contact', async () => {
      fetchStub.returns({ body: { contacts: [INTERCOM_RESPONSE] } })
      const result = await getLeadBy({ email })
      expect(result).to.equal(INTERCOM_RESPONSE)
    })
  })
  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      fetchStub.throws('Super Explosive Intercom Action')
      expect(getLeadBy({ email })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      fetchStub.throws('Super Explosive Intercom Action')
      const result = await getLeadBy({ email })
      expect(result).to.be.null()
    })
  })
})
