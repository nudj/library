/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { logThenThrow } = require('../../errors')

describe('logThenThrow', () => {
  it('should rethrow the error that is passed in', () => {
    const error = new Error('some error')
    expect(() => logThenThrow(error)).to.throw(error)
  })

  it('should add rest params as array to log property', () => {
    const error = new Error('some error')
    try {
      logThenThrow(error, 1, 2, 3, 'something to log')
    } catch (error) {
      expect(error.log).to.deep.equal([[1, 2, 3, 'something to log']])
    }
  })

  it('should append new array to log property if already exists', () => {
    const error = new Error('some error')
    error.log = [['this already exists']]
    try {
      logThenThrow(error, 1, 2, 3, 'something to log')
    } catch (error) {
      expect(error.log).to.deep.equal([
        ['this already exists'],
        [1, 2, 3, 'something to log']
      ])
    }
  })
})
