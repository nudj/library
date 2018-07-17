/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { getInvitationUrl } = require('../')

describe('getInvitationUrl', () => {
  it('should return a string in the right format', () => {
    const args = {
      protocol: 'https',
      hostname: 'gavin-da-ghost.co.uk',
      hash: 'super-secret-ghost-hash'
    }

    expect(getInvitationUrl(args)).to.equal(
      'https://gavin-da-ghost.co.uk/invitation-accept/super-secret-ghost-hash'
    )
  })
})
