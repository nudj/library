/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { actionMap } = require('../')

describe('actionMap', () => {
  const promiseObject = {
    primitive: 'primitiveResult',
    promise: Promise.resolve('promiseResult'),
    action: () => Promise.resolve('actionResult'),
    actionData: data => Promise.resolve('actionData' + data)
  }
  let data

  beforeEach(() => {
    data = actionMap(promiseObject, 'Result')
  })

  it('should return a promise', () => {
    expect(data).to.be.a('promise')
  })

  it('should resolve with a plain object', (done) => {
    data.then(result => {
      expect(result).to.be.an('object')
      done()
    })
  })

  it('should map primitives untouched', (done) => {
    data.then(result => {
      expect(result.primitive).to.equal('primitiveResult')
      done()
    })
  })

  it('should map result of sub promises', (done) => {
    data.then(result => {
      expect(result.promise).to.equal('promiseResult')
      done()
    })
  })

  it('should map result of actions', (done) => {
    data.then(result => {
      expect(result.action).to.equal('actionResult')
      done()
    })
  })

  it('should pass supplied data into actions', (done) => {
    data.then(result => {
      expect(result.actionData).to.equal('actionDataResult')
      done()
    })
  })

  it('should reject if sub promise rejects', (done) => {
    const rejectError = new Error('REJECT')
    actionMap({
      rejectPromise: Promise.reject(rejectError)
    })
    .catch(error => {
      expect(error).to.equal(rejectError)
      done()
    })
  })

  it('should reject if sub action rejects', (done) => {
    const rejectError = new Error('REJECT')
    actionMap({
      rejectAction: () => Promise.reject(rejectError)
    })
    .catch(error => {
      expect(error).to.equal(rejectError)
      done()
    })
  })
})
