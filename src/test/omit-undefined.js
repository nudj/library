/* eslint-env mocha */

const chai = require('chai')
const expect = chai.expect

const { omitUndefined } = require('../')

describe('omitUndefined', () => {
  it('is removes undefined values from an object', () => {
    const data = {
      cats: undefined,
      dogs: 1,
      lizards: 0,
      lemurs: 'no thanks'
    }
    expect(omitUndefined(data)).to.deep.equal({
      dogs: 1,
      lizards: 0,
      lemurs: 'no thanks'
    })
  })

  it('is does not remove other falsy values', () => {
    const data = {
      cats: undefined,
      dogs: null,
      lizards: 0,
      lemurs: false,
      description: ''
    }
    expect(omitUndefined(data)).to.deep.equal({
      dogs: null,
      lizards: 0,
      lemurs: false,
      description: ''
    })
  })
})
