/* eslint-env mocha */

const chai = require('chai')
const sinon = require('sinon')
const dirtyChai = require('dirty-chai')
const sinonChai = require('sinon-chai')
const proxyquire = require('proxyquire')
const expect = chai.expect

chai.use(dirtyChai)
chai.use(sinonChai)

const convertStub = sinon.stub()
const fetchStub = sinon.stub()

const convertLeadToUser = proxyquire('../../../../../lib/analytics/intercom/lib/leads/convert-to-user', {
  './get': fetchStub,
  '../api': {
    leads: {
      convert: convertStub
    }
  }
})

describe('intercom.convertLeadToUser', () => {
  const email = 'test@example.com'
  const INTERCOM_RESPONSE = 'INTERCOM_RESPONSE'

  beforeEach(() => {
    convertStub.reset()
    fetchStub.reset()
    fetchStub.returns({ email, user_id: '1234' })
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
    it('calls the `leads.convert` intercom method', async () => {
      await convertLeadToUser({ email })
      expect(convertStub).to.have.been.called()
    })

    it('returns the conversion response', async () => {
      convertStub.returns({ body: INTERCOM_RESPONSE })
      const result = await convertLeadToUser({ email })
      expect(result).to.equal(INTERCOM_RESPONSE)
    })
  })

  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      convertStub.throws('Super Explosive Intercom Action')
      expect(convertLeadToUser({ email })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      convertStub.throws('Super Explosive Intercom Action')
      const result = await convertLeadToUser({ email })
      expect(result).to.be.null()
    })
  })
})
