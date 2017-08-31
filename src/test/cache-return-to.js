/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const expect = chai.expect
chai.use(dirtyChai)
chai.use(sinonChai)

const { cacheReturnTo } = require('../server')

describe('cacheReturnTo', () => {
  let req, next, result

  beforeEach(() => {
    req = {
      session: {},
      get: sinon.stub().returns(42)
    }
    next = sinon.stub()
    result = cacheReturnTo(req, {}, next)
  })

  it('should return undefined', () => {
    expect(result).to.be.undefined()
  })

  it('should call next', () => {
    expect(next).to.have.been.called()
  })

  it('should add returnTo to the session', () => {
    expect(req.session.returnTo).to.not.be.undefined()
  })

  it('should set returnTo to the return value of req.get', () => {
    expect(req.session.returnTo).to.equal(42)
  })

  it('should not alter returnTo if it exists', () => {
    req.session.returnTo = 'assigned'
    cacheReturnTo(req, {}, next)
    expect(req.session.returnTo).to.equal('assigned')
  })

  it('should call req.get with "Referrer"', () => {
    expect(req.get).to.have.been.calledWith('Referrer')
  })
})
