/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const {
  Redirect,
  Unauthorized,
  NotFound,
  AppError,
  logThenThrow
} = require('../errors')

describe('errors', () => {
  describe('Redirect', () => {
    it('throws error if no url provided', () => {
      expect(() => new Redirect()).to.throw(AppError)
    })

    it('has url property', () => {
      const error = new Redirect({
        url: 'someurl'
      })
      expect(error).to.have.property('url', 'someurl')
    })

    it('has the correct name', () => {
      const error = new Redirect({
        url: 'someurl'
      })
      expect(error).to.have.property('name', 'Redirect')
    })

    it('has the correct message', () => {
      const error = new Redirect({
        message: 'someMessage',
        url: 'someurl'
      })
      expect(error).to.have.property('message', 'someMessage')
    })

    it('has the correct code', () => {
      const error = new Redirect({
        message: 'someMessage',
        code: 'RDRCT',
        url: 'someurl'
      })
      expect(error).to.have.property('code', 'RDRCT')
    })

    it('has notification property if passed in options', () => {
      const error = new Redirect({
        url: 'someurl',
        notification: 'somenotfication'
      })
      expect(error).to.have.property('notification', 'somenotfication')
    })

    it('has log property if extra params passed in', () => {
      const error = new Redirect({
        url: 'someurl',
        message: 'someMessage',
        log: [
          1,
          2,
          3
        ]
      })
      expect(error).to.have.property('log').to.deep.equal([1, 2, 3])
    })
  })

  describe('NotFound', () => {
    it('has the correct name', () => {
      const error = new NotFound()
      expect(error).to.have.property('name', 'NotFound')
    })

    it('has the correct message', () => {
      const error = new NotFound({ message: 'someMessage' })
      expect(error).to.have.property('message', 'someMessage')
    })

    it('has the correct code', () => {
      const error = new NotFound({ message: 'someMessage', code: 9000 })
      expect(error).to.have.property('code', 9000)
    })

    it('has log property if extra params passed in', () => {
      const error = new NotFound({ message: 'someMessage', log: [4, 6, 7] })
      expect(error).to.have.property('log').to.deep.equal([4, 6, 7])
    })
  })

  describe('Unauthorized', () => {
    it('throws error if no type provided', () => {
      expect(() => new Unauthorized()).to.throw(AppError)
    })

    it('has type property', () => {
      const error = new Unauthorized({
        type: 'sometype'
      })
      expect(error).to.have.property('type', 'sometype')
    })

    it('has the correct name', () => {
      const error = new Unauthorized({
        type: 'sometype'
      })
      expect(error).to.have.property('name', 'Unauthorized')
    })

    it('has the correct message', () => {
      const error = new Unauthorized({
        type: 'sometype',
        message: 'someMessage'
      })
      expect(error).to.have.property('message', 'someMessage')
    })

    it('has log property if extra params passed in', () => {
      const error = new Unauthorized({
        type: 'sometype',
        message: 'someMessage',
        log: [ 1, 2, 3 ]
      })
      expect(error).to.have.property('log').to.deep.equal([1, 2, 3])
    })
  })

  describe('AppError', () => {
    it('has the correct name', () => {
      const error = new AppError()
      expect(error).to.have.property('name', 'AppError')
    })

    it('has the correct message', () => {
      const error = new AppError({ message: 'someMessage' })
      expect(error).to.have.property('message', 'someMessage')
    })

    it('has the correct code', () => {
      const error = new AppError({ message: 'someMessage', code: 'ApErr' })
      expect(error).to.have.property('code', 'ApErr')
    })

    it('has log property if extra params passed in', () => {
      const error = new AppError({ message: 'someMessage', log: [1, 2, 3] })
      expect(error).to.have.property('log').to.deep.equal([1, 2, 3])
    })
  })

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
})
