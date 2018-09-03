/* eslint-env mocha */

const chai = require('chai')
const expect = chai.expect

const DisabledAnalytics = require('../../../../lib/analytics/adaptors/disabled')

describe('disabled adaptor', () => {
  let disabledAnalytics
  beforeEach(() => {
    disabledAnalytics = new DisabledAnalytics()
  })

  describe('track', () => {
    it('returns a promise that resolves to `undefined`', async () => {
      const result = await disabledAnalytics.track({})
      expect(result).to.be.undefined()
    })
  })

  describe('alias', () => {
    it('returns a promise that resolves to `undefined`', async () => {
      const result = await disabledAnalytics.alias({})
      expect(result).to.be.undefined()
    })
  })

  describe('identify', () => {
    it('returns a promise that resolves to `undefined`', async () => {
      const result = await disabledAnalytics.identify({})
      expect(result).to.be.undefined()
    })
  })

  describe('updateIdentity', () => {
    it('returns a promise that resolves to `undefined`', async () => {
      const result = await disabledAnalytics.updateIdentity({})
      expect(result).to.be.undefined()
    })
  })

  describe('register', () => {
    it('returns a promise that resolves to `undefined`', async () => {
      const result = await disabledAnalytics.register({})
      expect(result).to.be.undefined()
    })
  })

  describe('getId', () => {
    it('returns a promise that resolves to `undefined`', async () => {
      const result = await disabledAnalytics.getId({})
      expect(result).to.be.undefined()
    })
  })
})
