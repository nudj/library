/* eslint-env mocha */

const chai = require('chai')
const expect = chai.expect

const {
  validateAliasArgs,
  validateIdentifyArgs,
  validateTrackArgs
} = require('../../../lib/analytics/helpers/validation')

describe('validation', () => {
  describe('validateAliasArgs', () => {
    const id = 'user_123'
    const alias = 'user_456'

    it('throws if no `id` is provided', () => {
      expect(() => validateAliasArgs({})).to.throw()
    })

    it('throws if the provided `id` is not a string or number', () => {
      expect(() => validateAliasArgs({ id: {}, alias })).to.throw()
    })

    it('throws if no `alias` is provided', () => {
      expect(() => validateAliasArgs({ id })).to.throw()
    })

    it('throws if the provided `alias` is not a string or number', () => {
      expect(() => validateAliasArgs({ id, alias: {} })).to.throw()
    })

    it('does nothing if args are valid', () => {
      expect(() => validateAliasArgs({ id, alias })).not.to.throw()
      expect(() => validateAliasArgs({ id: 1, alias: 2 })).not.to.throw()
    })
  })

  describe('validateIdentifyArgs', () => {
    it('throws if no `id` is provided', () => {
      expect(() => validateIdentifyArgs({})).to.throw()
    })

    it('throws if the provided `id` is not a string or number', () => {
      expect(() => validateIdentifyArgs({ id: {} })).to.throw()
    })

    it('does nothing if args are valid', () => {
      expect(() => validateIdentifyArgs({ id: 'user_123' })).not.to.throw()
      expect(() => validateIdentifyArgs({ id: 1 })).not.to.throw()
    })
  })

  describe('validateTrackArgs', () => {
    let object = 'Job'
    let action = 'created'
    let properties = { app: 'hire' }

    it('throws if an object is not provided', () => {
      expect(() => validateTrackArgs({ properties, action })).to.throw()
    })

    it('throws if an action is not provided', () => {
      expect(() => validateTrackArgs({ properties, object })).to.throw()
    })

    it('throws if `action` is not a string', () => {
      expect(() => validateTrackArgs({
        properties,
        object,
        action: {}
      })).to.throw()
    })

    it('throws if `object` is not a string', () => {
      expect(() => validateTrackArgs({
        properties,
        action,
        object: {}
      })).to.throw()
    })

    it('does nothing if args are valid', () => {
      expect(() => validateTrackArgs({ properties, object, action })).not.to.throw()
    })
  })
})
