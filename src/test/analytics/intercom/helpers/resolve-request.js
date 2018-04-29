/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { resolveRequest } = require('../../../../lib/analytics/intercom/helpers')

const INTERCOM_RESPONSE = 'INTERCOM_RESPONSE'

describe('resolveRequest', () => {
  describe('when `status` is 200', () => {
    const response = {
      status: 200,
      body: INTERCOM_RESPONSE
    }

    it('returns the response body', async () => {
      expect(await resolveRequest(response)).to.equal(INTERCOM_RESPONSE)
    })

    it('resolves a promise if provided', async () => {
      const promiseResponse = Promise.resolve(response)
      expect(await resolveRequest(promiseResponse)).to.equal(INTERCOM_RESPONSE)
    })
  })

  describe('when `statusCode` is 200', () => {
    const response = {
      statusCode: 200,
      body: INTERCOM_RESPONSE
    }

    it('returns the response body', async () => {
      expect(await resolveRequest(response)).to.equal(INTERCOM_RESPONSE)
    })

    it('resolves a promise if provided', async () => {
      const promiseResponse = Promise.resolve(response)
      expect(await resolveRequest(promiseResponse)).to.equal(INTERCOM_RESPONSE)
    })
  })

  describe('when `status` is not 200', () => {
    const response = {
      status: 900000,
      body: INTERCOM_RESPONSE
    }

    it('throws an error', async () => {
      expect(resolveRequest(response)).to.eventually.be.rejectedWith(
        'Intercom gone done broke: 900000'
      )
    })
  })

  describe('when `statusCode` is not 200', () => {
    const response = {
      statusCode: 'NahMate',
      body: INTERCOM_RESPONSE
    }

    it('throws an error', async () => {
      expect(resolveRequest(response)).to.eventually.be.rejectedWith(
        'Intercom gone done broke: NahMate'
      )
    })
  })

  describe('when `status` and `statusCode` do not exist', () => {
    const response = {
      body: INTERCOM_RESPONSE
    }

    it('attempts to return the body', async () => {
      expect(await resolveRequest(response)).to.equal(INTERCOM_RESPONSE)
    })
  })
})
