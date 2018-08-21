/* eslint-env mocha */

const chai = require('chai')
const sinon = require('sinon')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const { cookies } = require('../')

chai.use(dirtyChai)

const name = 'cookieName'
const req = {
  cookies: {
    __SecureNudjCookieName: 123
  }
}
const res = {
  cookie: sinon.stub(),
  clearCookie: sinon.stub()
}

describe('cookies', () => {
  describe('get', () => {
    it('returns the cookie by name', () => {
      expect(cookies.get(req, name)).to.equal(123)
    })
  })

  describe('set', () => {
    beforeEach(() => {
      cookies.set(res, name, 456)
    })

    it('sets the cookie by name', () => {
      expect(res.cookie).to.have.been.calledWith(
        '__SecureNudjCookieName',
        456
      )
    })

    it('sets secure options', () => {
      expect(res.cookie.args[0][2]).to.deep.equal({
        httpOnly: true,
        secure: true
      })
    })
  })

  describe('clear', () => {
    it('clears the cookie by name', () => {
      cookies.clear(res, name)
      expect(res.clearCookie).to.have.been.calledWith('__SecureNudjCookieName')
    })
  })

  describe('getSecureName', () => {
    it('returns the secure cookie', () => {
      expect(cookies.getSecureName(name)).to.equal('__SecureNudjCookieName')
    })
  })
})
