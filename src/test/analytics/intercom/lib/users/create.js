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
const tagStub = sinon.stub()

const createUser = proxyquire('../../../../../lib/analytics/intercom/lib/users/create', {
  './tag': tagStub,
  '../api': {
    users: {
      create: createStub
    }
  }
})

describe('intercom.createUser', () => {
  const email = 'test@example.com'
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
    it('calls `users.create` intercom method', async () => {
      await createUser({ email })
      expect(createStub).to.have.been.calledWith({ email })
    })

    it('returns the response body', async () => {
      createStub.returns({ body: INTERCOM_RESPONSE })
      const result = await createUser({ email })
      expect(result).to.equal(INTERCOM_RESPONSE)
    })

    describe('when tags are added', () => {
      it('tags the created user', async () => {
        createStub.returns({ body: INTERCOM_RESPONSE })
        await createUser({ email, tags: ['special'] })

        expect(tagStub).to.have.been.calledWith({
          tags: ['special'],
          user: INTERCOM_RESPONSE
        })
      })
    })
  })
  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      createStub.throws('Super Explosive Intercom Action')
      expect(createUser({ email })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      createStub.throws('Super Explosive Intercom Action')
      const result = await createUser({ email })
      expect(result).to.be.null()
    })
  })
})
