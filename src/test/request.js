/* eslint-env mocha */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const dirtyChai = require('dirty-chai')
const nock = require('nock')
const expect = chai.expect

chai.use(chaiAsPromised)
chai.use(dirtyChai)

const request = require('../lib/request')
let server

describe('Request', () => {
  before(() => {
    server = nock('http://localhost:82/')
  })
  afterEach(() => {
    nock.cleanAll()
  })
  it('returns a promise', () => {
    server.get('/').reply(200)
    expect(request('/')).to.be.an.instanceof(Promise)
  })
  it('makes a request', () => {
    server.get('/').reply(200)
    return expect(request('/')).to.be.fulfilled()
  })
  it('adds Accepts header', () => {
    server.get('/')
      .matchHeader('Accept', 'application/json')
      .reply(200)
    return expect(request('/')).to.be.fulfilled()
  })
  it('adds X-Requested-With header', () => {
    server.get('/')
      .matchHeader('X-Requested-With', 'XMLHttpRequest')
      .reply(200)
    return expect(request('/')).to.be.fulfilled()
  })
  it('resolves with result', () => {
    server.get('/').reply(200, 'response')
    return expect(request('/')).to.become('response')
  })
  it('handles posts with data', () => {
    server.post('/', { a: 1 }).reply(200)
    return expect(request('/', {
      method: 'post',
      data: { a: 1 }
    })).to.be.fulfilled()
  })
})
