/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect

chai.use(sinonChai)
chai.use(dirtyChai)

const { logger } = require('../')
const envCache = process.env.ENVIRONMENT

describe('logger', () => {
  let consoleLog
  let consoleWarn
  let consoleError

  before(() => {
    process.env.ENVIRONMENT = 'nottest'
    consoleLog = sinon.stub(console, 'log')
    consoleWarn = sinon.stub(console, 'warn')
    consoleError = sinon.stub(console, 'error')
  })
  afterEach(() => {
    consoleLog.reset()
    consoleWarn.reset()
    consoleError.reset()
  })
  after(() => {
    process.env.ENVIRONMENT = envCache
    consoleLog.restore()
    consoleWarn.restore()
    consoleError.restore()
  })

  it('calls console.log when info type', () => {
    logger('info')
    expect(consoleLog).to.have.been.called()
    expect(consoleWarn).to.not.have.been.called()
    expect(consoleError).to.not.have.been.called()
  })

  it('calls console.log when warn type', () => {
    logger('warn')
    expect(consoleLog).to.not.have.been.called()
    expect(consoleWarn).to.have.been.called()
    expect(consoleError).to.not.have.been.called()
  })

  it('calls console.error when error type', () => {
    logger('error')
    expect(consoleLog).to.not.have.been.called()
    expect(consoleWarn).to.not.have.been.called()
    expect(consoleError).to.have.been.called()
  })

  it('passes through any additional args to console.log', () => {
    logger('info', 1, 2, 3)
    expect(consoleLog).to.have.been.calledWith(1, 2, 3)
  })

  it('should throw for invalid log type', () => {
    try {
      logger('invalidType', 1, 2, 3)
    } catch (error) {
      expect(error.message).to.equal('Invalid log type: invalidType')
    }
  })

  it('should not log when ENVIRONMENT=test', () => {
    process.env.ENVIRONMENT = 'test'
    logger('info', 1, 2, 3)
    process.env.ENVIRONMENT = 'nottest'
    expect(consoleLog).to.not.have.been.called()
    expect(consoleWarn).to.not.have.been.called()
    expect(consoleError).to.not.have.been.called()
  })
})
