/* eslint-env mocha */

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const dirtyChai = require('dirty-chai')

const expect = chai.expect
chai.use(dirtyChai)
chai.use(sinonChai)

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

  it('should wrap provided function in a function call', () => {
    const dispatch = sinon.stub()
    quickDispatch(testAction)(dispatch)
    expect(dispatch).to.be.calledWith(testAction)
  })
})
