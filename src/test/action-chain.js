/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { actionChain } = require('../')

describe('actionChain', () => {
  const action1 = () => new Promise(resolve => resolve(1))
  const action2 = () => new Promise(resolve => resolve(2))
  const errorReject = new Error('REJECT')
  const actionReject = data => new Promise((resolve, reject) => reject(errorReject))

  it('should return a promise', () => {
    expect(actionChain([action1, action2], 0)).to.be.a('Promise')
  })

  it('should resolve when all the actions have resolved', (done) => {
    actionChain([action1, action2], 0).then(() => {
      expect(true).to.be.true()
      done()
    })
  })

  it('should resolve with the final resolve value', (done) => {
    actionChain([action1, action2], 0).then(result => {
      expect(result).to.equal(2)
      done()
    })
  })

  it('should pass each resolution to the next action', (done) => {
    const pIncrement = data => new Promise(resolve => resolve(data + 1))
    actionChain([pIncrement, pIncrement], 0).then(result => {
      expect(result).to.equal(2)
      done()
    })
  })

  it('should reject with any errors', (done) => {
    actionChain([actionReject], 0).catch(error => {
      expect(error).to.equal(errorReject)
      done()
    })
  })

  it('should reject with first error', (done) => {
    actionChain([actionReject, action2], 0).catch(error => {
      expect(error).to.equal(errorReject)
      done()
    })
  })

  it('should reject after deep chain error', (done) => {
    actionChain([action1, actionReject], 0).catch(error => {
      expect(error).to.equal(errorReject)
      done()
    })
  })

  it('should be curried', (done) => {
    const curried = actionChain([action1, action2])
    expect(curried).to.be.a('function')
    curried(0).then(result => {
      expect(result).to.equal(2)
      done()
    })
  })
})
