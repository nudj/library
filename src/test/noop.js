/* eslint-env mocha */

const chai = require('chai')
const expect = chai.expect

const { noop } = require('../')

describe('noop', () => {
  it('is a function', () => {
    expect(noop).to.be.a('function')
  })

  it('returns undefined', () => {
    expect(noop()).to.be.undefined()
  })
})
