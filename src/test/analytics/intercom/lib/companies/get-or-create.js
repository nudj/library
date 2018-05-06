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

const getOrCreateCompany = proxyquire('../../../../../lib/analytics/intercom/lib/companies/get-or-create', {
  './get': fetchStub,
  './create': createStub
})

describe('intercom.getOrCreateCompany', () => {
  const name = 'Fake Company'
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
    describe('when the company exists', () => {
      beforeEach(() => {
        fetchStub.returns(INTERCOM_RESPONSE)
      })

      it('calls `intercom.getCompanyBy` method', async () => {
        await getOrCreateCompany({ name })
        expect(fetchStub).to.have.been.calledWith({ name })
      })

      it('does not create a new company', async () => {
        await getOrCreateCompany({ name })
        expect(createStub).to.not.have.been.calledWith({ name })
      })

      it('returns the fetched contact', async () => {
        const result = await getOrCreateCompany({ name })
        expect(result).to.equal(INTERCOM_RESPONSE)
      })
    })

    describe('when the company does not exist', () => {
      it('calls `intercom.getCompanyBy` method', async () => {
        await getOrCreateCompany({ name })
        expect(fetchStub).to.have.been.calledWith({ name })
      })

      it('calls `intercom.createCompany` method', async () => {
        await getOrCreateCompany({ name })
        expect(createStub).to.have.been.calledWith({ name })
      })

      it('returns the created contact', async () => {
        createStub.returns(`${INTERCOM_RESPONSE}_CREATED`)
        const result = await getOrCreateCompany({ name })
        expect(result).to.equal(`${INTERCOM_RESPONSE}_CREATED`)
      })
    })
  })

  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      fetchStub.throws('Super Explosive Intercom Action')
      expect(getOrCreateCompany({ name })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      fetchStub.throws('Super Explosive Intercom Action')
      const result = await getOrCreateCompany({ name })
      expect(result).to.be.null()
    })
  })
})
