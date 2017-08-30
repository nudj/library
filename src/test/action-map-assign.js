/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { actionMapAssign } = require('../')

describe('actionMapAssign', () => {
  const actionMap1 = {
    a1: () => Promise.resolve(1)
  }
  const actionMap2 = {
    a2: () => Promise.resolve(2)
  }
  const actionMapData = {
    aData: data => Promise.resolve(data.a1 + 1)
  }
  const actionReject = new Error('REJECT')
  const actionMapReject = {
    reject: () => Promise.reject(actionReject)
  }

  it('should return a promise', () => {
    expect(actionMapAssign(actionMap1, actionMap2)).to.be.a('promise')
  })

  it('should return an object', (done) => {
    actionMapAssign(actionMap1, actionMap2).then(result => {
      expect(result).to.be.an('object')
      done()
    })
  })

  it('should return an accumulation of the results of all the resolved actionMaps', (done) => {
    actionMapAssign(actionMap1, actionMap2).then(result => {
      expect(result).to.deep.equal({
        a1: 1,
        a2: 2
      })
      done()
    })
  })

  it('should pass the resolutions of previous actionMaps onto the next actionMap\'s actions', (done) => {
    actionMapAssign(actionMap1, actionMapData).then(result => {
      expect(result).to.deep.equal({
        a1: 1,
        aData: 2
      })
      done()
    })
  })

  it('should should reject if any of the actionMaps reject', (done) => {
    actionMapAssign(actionMap1, actionMapReject).catch(error => {
      expect(error).to.equal(actionReject)
      done()
    })
  })
})
