/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { addDataKeyValue } = require('../')

describe('addDataKeyValue', () => {
  const key = 'value'
  const action = () => new Promise(resolve => resolve(1))
  const actionData = data => new Promise(resolve => resolve(data.one + 1))
  const errorReject = new Error('REJECT')
  const actionReject = () => new Promise((resolve, reject) => reject(errorReject))

  it('should return a function', () => {
    expect(addDataKeyValue(key, action)).to.be.a('Function')
  })

  it('should return a function that returns a promise', () => {
    expect(addDataKeyValue(key, action)({})).to.be.a('Promise')
  })

  it('should resolve with object', (done) => {
    addDataKeyValue(key, action)({}).then(data => {
      expect(data).to.be.an('Object')
      done()
    })
  })

  it('should resolve with an object with correct key', (done) => {
    addDataKeyValue(key, action)({}).then(data => {
      expect(Object.keys(data)).to.deep.equal(['value'])
      done()
    })
  })

  it('should resolve with an object with keyed value as result of action', (done) => {
    addDataKeyValue(key, action)({}).then(data => {
      expect(data).to.deep.equal({
        value: 1
      })
      done()
    })
  })

  it('should pass data down to actions and append results to data', (done) => {
    addDataKeyValue(key, actionData)({ one: 1 }).then(data => {
      expect(data).to.deep.equal({
        one: 1,
        value: 2
      })
      done()
    })
  })

  it('should reject when action rejects', (done) => {
    addDataKeyValue(key, actionReject)({}).catch(error => {
      expect(error).to.equal(errorReject)
      done()
    })
  })
})
