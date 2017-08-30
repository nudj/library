/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { toQs } = require('../')

describe('toQs', () => {
  it('should return a string', () => {
    expect(toQs()).to.be.a('string')
  })

  it('should return the key and value in query string format', () => {
    expect(toQs({
      key: 'value'
    })).to.equal('key=value')
  })

  it('should return multiple key/value pairs separated by an ampersand', () => {
    expect(toQs({
      key1: 'value1',
      key2: 'value2'
    })).to.equal('key1=value1&key2=value2')
  })

  it('should encode the query string keys and values', () => {
    expect(toQs({
      '@': '?'
    })).to.equal('%40=%3F')
  })
})
