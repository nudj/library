/* eslint-env mocha */

const chai = require('chai')
const sinon = require('sinon')
const dirtyChai = require('dirty-chai')
const sinonChai = require('sinon-chai')
const proxyquire = require('proxyquire')
const expect = chai.expect

chai.use(dirtyChai)
chai.use(sinonChai)

const createStub = sinon.stub()

const createCompany = proxyquire('../../../../../lib/analytics/intercom/lib/companies/create', {
  '../api': {
    companies: {
      create: createStub
    }
  }
})

describe('intercom.createCompany', () => {
  const name = 'Super Company'
  const INTERCOM_RESPONSE = 'INTERCOM_RESPONSE'

  beforeEach(() => {
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
    it('calls `companies.create` intercom method', async () => {
      await createCompany({ name })
      expect(createStub).to.have.been.calledWith({ name })
    })

    it('returns the response body', async () => {
      createStub.returns({ body: INTERCOM_RESPONSE })
      const result = await createCompany({ name })
      expect(result).to.equal(INTERCOM_RESPONSE)
    })
  })
  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      createStub.throws('Super Explosive Intercom Action')
      expect(createCompany({ name })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      createStub.throws('Super Explosive Intercom Action')
      const result = await createCompany({ name })
      expect(result).to.be.null()
    })
  })
})
