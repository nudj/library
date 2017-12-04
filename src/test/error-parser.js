/* eslint-env mocha */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(chaiAsPromised)
chai.use(dirtyChai)

const { errorParser } = require('../')

const pageErrors = {
  'BigErrorType': {
    'Invalid entry': 'Unable to locate your test'
  },
  'SmallErrorType': {
    'Slight issue': 'Please update your testing framework'
  }
}

describe('errorParser', () => {
  it('returns correct error message', () => {
    const parseError = errorParser(pageErrors)
    const serverError = 'BigErrorType|Invalid entry|Test not found'
    expect(parseError(serverError)).to.equal('Unable to locate your test')
  })

  it('returns correct error message with spaced splitters', () => {
    const parseError = errorParser(pageErrors)
    const serverError = 'SmallErrorType | Slight issue | Invalid stuff happening'
    expect(parseError(serverError)).to.equal('Please update your testing framework')
  })

  it('returns correct message even if no default is provided', () => {
    const parseError = errorParser(pageErrors)
    const serverError = 'SmallErrorType | Slight issue'
    expect(parseError(serverError)).to.equal('Please update your testing framework')
  })

  it('returns undefined if no message key is provided', () => {
    const parseError = errorParser(pageErrors)
    const serverError = 'SmallErrorType'
    expect(parseError(serverError)).to.be.undefined()
  })

  it('returns undefined if no server error is passed', () => {
    const parseError = errorParser(pageErrors)
    expect(parseError()).to.be.undefined()
  })

  it('returns default error message if error type is not found', () => {
    const parseError = errorParser(pageErrors)
    const serverError = 'BadType|Invalid entry|Test not found'
    expect(parseError(serverError)).to.equal('Test not found')
  })

  it('returns default error message if message key is not found', () => {
    const parseError = errorParser(pageErrors)
    const serverError = 'BigErrorType|Super awesome key|Nothing to see here'
    expect(parseError(serverError)).to.equal('Nothing to see here')
  })

  it('returns default message if no pageErrors are provided', () => {
    const parseError = errorParser()
    const serverError = 'BigErrorType|Invalid entry|Error: Test too awesome!'
    expect(parseError(serverError)).to.equal('Error: Test too awesome!')
  })

  it('returns default if no pageErrors are provided', () => {
    const parseError = errorParser()
    const serverError = 'SmallErrorType|Slight issue|Invalid stuff happening'
    expect(parseError(serverError)).to.equal('Invalid stuff happening')
  })
})
