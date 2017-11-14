/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { Redirect, Unauthorized, NotFound, AppError } = require('../errors')

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
    it('has notification property if passed in options', () => {
      const error = new Redirect({
        url: 'someurl',
        notification: 'somenotfication'
      })
      expect(error).to.have.property('notification', 'somenotfication')
    })
    it('has log property if extra params passed in', () => {
      const error = new Redirect(
        {
          url: 'someurl'
        },
        1,
        2,
        3
      )
      expect(error).to.have.property('log')
      expect(error.log).to.deep.equal([1, 2, 3])
    })
  })
  describe('NotFound', () => {
    it('has the correct name', () => {
      const error = new NotFound()
      expect(error).to.have.property('name', 'NotFound')
    })
    it('has log property if extra params passed in', () => {
      const error = new NotFound(1, 2, 3)
      expect(error).to.have.property('log')
      expect(error.log).to.deep.equal([1, 2, 3])
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
    it('has log property if extra params passed in', () => {
      const error = new Unauthorized(
        {
          type: 'sometype'
        },
        1,
        2,
        3
      )
      expect(error).to.have.property('log')
      expect(error.log).to.deep.equal([1, 2, 3])
    })
  })
  describe('AppError', () => {
    it('has the correct name', () => {
      const error = new AppError()
      expect(error).to.have.property('name', 'AppError')
    })
    it('has log property if extra params passed in', () => {
      const error = new AppError(1, 2, 3)
      expect(error).to.have.property('log')
      expect(error.log).to.deep.equal([1, 2, 3])
    })
  })
})
