/* eslint-env mocha */

const chai = require('chai')
const sinon = require('sinon')
const flatten = require('lodash/flatten')
const dirtyChai = require('dirty-chai')
const sinonChai = require('sinon-chai')
const proxyquire = require('proxyquire')
const expect = chai.expect

chai.use(dirtyChai)
chai.use(sinonChai)

const untagStub = sinon.stub()
const fetchStub = sinon.stub()

const untagUser = proxyquire('../../../../../lib/analytics/intercom/lib/users/untag', {
  './get': fetchStub,
  '../api': {
    tags: {
      untag: untagStub
    }
  }
})

describe('intercom.untagUser', () => {
  const email = 'test@example.com'
  const INTERCOM_RESPONSE = { id: 'user_id1' }

  beforeEach(() => {
    untagStub.reset()
    fetchStub.reset()
    fetchStub.returns(INTERCOM_RESPONSE)
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
    it('calls `tags.untag` intercom method', async () => {
      await untagUser({
        user: { email },
        tags: ['special', 'legendary']
      })
      expect(untagStub).to.have.been.called()
    })

    it('formats the tag data', async () => {
      await untagUser({
        user: { email },
        tags: ['special', 'legendary']
      })
      const tags = flatten(untagStub.args)

      expect(tags).to.deep.equal([
        {
          name: 'special',
          users: [{ id: 'user_id1' }]
        },
        {
          name: 'legendary',
          users: [{ id: 'user_id1' }]
        }
      ])
    })

    it('returns the user', async () => {
      const result = await untagUser({
        user: { email },
        tags: ['special', 'legendary']
      })
      expect(result).to.equal(INTERCOM_RESPONSE)
    })
  })

  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      untagStub.throws('Super Explosive Intercom Action')
      expect(untagUser({
        user: { email },
        tags: ['special', 'legendary']
      })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      untagStub.throws('Super Explosive Intercom Action')
      const result = await untagUser({
        user: { email },
        tags: ['special', 'legendary']
      })
      expect(result).to.be.null()
    })
  })
})
