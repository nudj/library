/* eslint-env mocha */

const chai = require('chai')
const expect = chai.expect

const { promiseNoop } = require('../')

describe('promiseNoop', () => {
  it('is a function', () => {
    expect(promiseNoop).to.be.a('function')
  })

  it('returns a promise', () => {
    expect(promiseNoop()).to.be.a('promise')
  })

  it('returns a promise that resolves to undefined', async () => {
    const result = await promiseNoop()
    expect(result).to.be.undefined()
  })
})
