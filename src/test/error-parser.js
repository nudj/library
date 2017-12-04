/* eslint-env mocha */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(chaiAsPromised)
chai.use(dirtyChai)

const { errorParser } = require('../')

const pageErrors = {
  'NotFound': {
    'Invalid entry': 'Unable to locate your test'
  }
}

describe('errorParser', () => {
  it('returns correct error message', () => {
    const parseError = errorParser(pageErrors)
    const serverError = 'NotFound|Invalid entry|Test not found'
    expect(parseError(serverError)).to.equal('Unable to locate your test')
  })
})
