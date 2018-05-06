/* eslint-env mocha */

const chai = require('chai')
const sinon = require('sinon')
const dirtyChai = require('dirty-chai')
const sinonChai = require('sinon-chai')
const proxyquire = require('proxyquire')
const expect = chai.expect

chai.use(dirtyChai)
chai.use(sinonChai)

const updateStub = sinon.stub()
const fetchStub = sinon.stub()

const updateCompany = proxyquire('../../../../../lib/analytics/intercom/lib/companies/update', {
  './get': fetchStub,
  '../api': {
    companies: {
      update: updateStub
    }
  }
})

describe('intercom.updateCompany', () => {
  const name = 'Purple Dragon'
  const INTERCOM_RESPONSE = 'INTERCOM_RESPONSE'

  beforeEach(() => {
    updateStub.reset()
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
    it('calls `companies.update` with provided company data', async () => {
      fetchStub.returns({ company_id: INTERCOM_RESPONSE })
      await updateCompany({
        company: { name },
        data: {
          type: 'Customer Service',
          custom_attributes: {
            established: 1982
          }
        }
      })
      expect(updateStub).to.have.been.calledWith({
        company_id: 'INTERCOM_RESPONSE',
        type: 'Customer Service',
        custom_attributes: { established: 1982 }
      })
    })

    it('returns the updated company', async () => {
      fetchStub.returns({ company_id: INTERCOM_RESPONSE })
      updateStub.returns({ body: INTERCOM_RESPONSE })
      const result = await updateCompany({
        company: { name },
        data: {
          type: 'Customer Service'
        }
      })
      expect(result).to.equal(INTERCOM_RESPONSE)
    })
  })

  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      updateStub.throws('Super Explosive Intercom Action')
      const company = { name }
      const data = { type: 'Customer Service' }

      expect(updateCompany({ company, data })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      updateStub.throws('Super Explosive Intercom Action')
      const company = { name }
      const data = { type: 'Customer Service' }
      const result = await updateCompany({ company, data })
      expect(result).to.be.null()
    })
  })
})
