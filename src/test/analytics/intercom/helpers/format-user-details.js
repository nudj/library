/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { formatUserDetails } = require('../../../../lib/analytics/intercom/helpers')

describe('formatUserDetails', () => {
  it('remove irrelevant fields from user data', () => {
    const user = { id: '12345', name: 'David Platt' }
    expect(formatUserDetails(user)).to.deep.equal({ id: '12345' })
  })

  it('should return `email`, `id` & `user_id` fields if provided', () => {
    const user = {
      name: 'David Platt',
      id: '123',
      captain: 'face',
      user_id: 'abc',
      email: 'd.platt@nudj.co'
    }
    expect(formatUserDetails(user)).to.deep.equal({
      email: 'd.platt@nudj.co',
      id: '123',
      user_id: 'abc'
    })
  })

  it('should remove `undefined` values', () => {
    const user = { id: undefined, email: 'd.platt@nudj.co' }
    expect(formatUserDetails(user)).to.deep.equal({ email: 'd.platt@nudj.co' })
  })
})
