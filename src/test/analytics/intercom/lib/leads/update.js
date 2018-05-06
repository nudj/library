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

const updateLead = proxyquire('../../../../../lib/analytics/intercom/lib/leads/update', {
  './tag': tagStub,
  '../api': {
    leads: {
      update: updateStub
    }
  }
})

describe('intercom.updateLead', () => {
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
    it('calls `leads.update` with an email', async () => {
      await updateLead({
        lead: { email },
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

    it('returns the updated lead', async () => {
      updateStub.returns({ body: INTERCOM_RESPONSE })
      const result = await updateLead({
        lead: { email },
        data: {
          rank: 'Sergeant Major'
        }
      })
      expect(result).to.equal(INTERCOM_RESPONSE)
    })

    describe('when tags are added', () => {
      it('tags the updated lead', async () => {
        await updateLead({
          lead: { email },
          data: {
            rank: 'Sergeant Major',
            tags: ['Hello']
          }
        })

        expect(tagStub).to.have.been.calledWith({
          tags: ['Hello'],
          lead: { email: 'test@example.com' }
        })
      })
    })
  })

  describe('when request is unsuccessful', () => {
    it('catches intercom errors', () => {
      updateStub.throws('Super Explosive Intercom Action')
      const lead = { email }
      const data = { rank: 'Sergeant Major' }

      expect(updateLead({ lead, data })).to.eventually.be.fulfilled()
    })

    it('returns null', async () => {
      updateStub.throws('Super Explosive Intercom Action')
      const lead = { email }
      const data = { rank: 'Sergeant Major' }
      const result = await updateLead({ lead, data })
      expect(result).to.be.null()
    })
  })
})
