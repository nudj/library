/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { quickDispatch } = require('../')

const testAction = () => {
  return {
    type: 'TEST_ACTION'
  }
}

describe('quickDispatch', () => {
  it('should return a function', () => {
    expect(quickDispatch(testAction)).to.be.a('function')
  })
})
