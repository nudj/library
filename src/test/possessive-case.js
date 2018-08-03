/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const { possessiveCase } = require('../')

chai.use(dirtyChai)

describe('possessiveCase', () => {
  describe('when the string ends in `s`', () => {
    it('appends `\'s` to the string', () => {
      expect(possessiveCase('Jess')).to.equal('Jess\'')
    })
  })

  describe('when the string does not end in `s`', () => {
    it('appends `\'s` to the string', () => {
      expect(possessiveCase('Dave')).to.equal('Dave\'s')
    })
  })
})
