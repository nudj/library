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
const tagStub = sinon.stub()

const updateUser = proxyquire('../../../../../lib/analytics/intercom/lib/users/update', {
  './tag': tagStub,
  '../api': {
    users: {
      update: updateStub
    }
  }
})

describe('intercom.updateUser', () => {
  const email = 'test@example.com'
  const INTERCOM_RESPONSE = 'INTERCOM_RESPONSE'

  beforeEach(() => {
    updateStub.reset()
    tagStub.reset()
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
    it('calls `users.update` with an email', async () => {
      await updateUser({
        user: { email },
        data: {
          rank: 'Sergeant Major',
          custom_attributes: {
            age: 38
          }
        }
      })
      expect(updateStub).to.have.been.calledWith({
        email,
        rank: 'Sergeant Major',
        custom_attributes: {
          age: 38
        }
      })
    })

    it('returns the updated user', async () => {
      updateStub.returns({ body: INTERCOM_RESPONSE })
      const result = await updateUser({
        user: { email },
        data: {
          rank: 'Sergeant Major'
        }
      })
      expect(result).to.equal(INTERCOM_RESPONSE)
    })

    describe('when tags are added', () => {
      it('tags the updated user', async () => {
        await updateUser({
          user: { email },
          data: {
            rank: 'Sergeant Major',
            tags: ['Hello']
          }
        })

        expect(tagStub).to.have.been.calledWith({
          tags: ['Hello'],
          user: { email: 'test@example.com' }
        })
      })
    })
  })

  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      updateStub.throws('Super Explosive Intercom Action')
      const user = { email }
      const data = { rank: 'Sergeant Major' }

      expect(updateUser({ user, data })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      updateStub.throws('Super Explosive Intercom Action')
      const user = { email }
      const data = { rank: 'Sergeant Major' }
      const result = await updateUser({ user, data })
      expect(result).to.be.null()
    })
  })
})
