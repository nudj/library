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

const tagsStub = sinon.stub()
const fetchStub = sinon.stub()

const fetchStubCalls = (stub) => {
  const { args } = stub.getCalls()[0].proxy
  return flatten(args)
}

const tagUser = proxyquire('../../../../../lib/analytics/intercom/lib/users/tag', {
  './get': fetchStub,
  '../api': {
    tags: {
      tag: tagsStub
    }
  }
})

describe('intercom.tagUser', () => {
  const email = 'test@example.com'
  const INTERCOM_RESPONSE = { id: 'user_id1' }

  beforeEach(() => {
    tagsStub.reset()
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
    it('calls `tags.tag` intercom method', async () => {
      await tagUser({
        user: { email },
        tags: ['special', 'legendary']
      })
      expect(tagsStub).to.have.been.called()
    })

    it('formats the tag data', async () => {
      await tagUser({
        user: { email },
        tags: ['special', 'legendary']
      })
      const tags = fetchStubCalls(tagsStub)

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
      const result = await tagUser({
        user: { email },
        tags: ['special', 'legendary']
      })
      expect(result).to.equal(INTERCOM_RESPONSE)
    })
  })

  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      tagsStub.throws('Super Explosive Intercom Action')
      expect(tagUser({
        user: { email },
        tags: ['special', 'legendary']
      })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      tagsStub.throws('Super Explosive Intercom Action')
      const result = await tagUser({
        user: { email },
        tags: ['special', 'legendary']
      })
      expect(result).to.be.null()
    })
  })
})
