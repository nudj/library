/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { getReferralUrl } = require('../')

describe('getReferralUrl', () => {
  it('should return a string in the right format', () => {
    const args = {
      protocol: 'https',
      hostname: 'web.co',
      referralId: 123
    }

    expect(getReferralUrl(args)).to.equal('https://web.co/r/123')
  })
})
