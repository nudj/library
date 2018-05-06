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

const getCompanyBy = proxyquire('../../../../../lib/analytics/intercom/lib/companies/get', {
  '../api': {
    companies: {
      listBy: fetchStub
    }
  }
})

describe('intercom.getCompanyBy', () => {
  const name = 'Cake Fompany'
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
    it('calls `companies.listBy` intercom method', async () => {
      await getCompanyBy({ name })
      expect(fetchStub).to.have.been.calledWith({ name })
    })

    it('returns the fetched contact', async () => {
      fetchStub.returns({ body: INTERCOM_RESPONSE })
      const result = await getCompanyBy({ name })
      expect(result).to.equal(INTERCOM_RESPONSE)
    })
  })

  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      fetchStub.throws('Super Explosive Intercom Action')
      expect(getCompanyBy({ name })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      fetchStub.throws('Super Explosive Intercom Action')
      const result = await getCompanyBy({ name })
      expect(result).to.be.null()
    })
  })
})
