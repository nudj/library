/* eslint-env mocha */
const chai = require('chai')
const expect = chai.expect

const getFirstNonNil = require('../lib/get-first-non-nil')

describe('getFirstNonNil', () => {
  it('returns the first non null or undefined value', () => {
    expect(getFirstNonNil('')).to.equal('')
    expect(getFirstNonNil(null, '')).to.equal('')
    expect(getFirstNonNil(undefined, false)).to.equal(false)
    expect(getFirstNonNil(undefined, 0, 'foo')).to.equal(0)
  })
})
