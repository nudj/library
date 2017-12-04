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

  it('returns a nested function which takes the action as an argument', () => {
    const dispatch = (fn) => fn().type
    const actionFunction = quickDispatch(testAction)
    expect(actionFunction(dispatch)).to.equal('TEST_ACTION')
  })

  it('should wrap provided action in a function call', () => {
    const dispatch = sinon.stub()
    quickDispatch(testAction)(dispatch)
    expect(dispatch).to.be.calledWith(testAction)
  })
})
