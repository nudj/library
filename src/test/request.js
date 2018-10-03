/* eslint-env mocha */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const dirtyChai = require('dirty-chai')
const nock = require('nock')
const expect = chai.expect

chai.use(chaiAsPromised)
chai.use(dirtyChai)

const { Unauthorized, NotFound, AppError } = require('../lib/errors')
const request = require('../request')
let server

describe('request', () => {
  before(() => {
    server = nock(`http://${process.env.API_HOST}:${process.env.API_PORT}/`, {
      reqheaders: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
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

  it('resolves with result', () => {
    server.get('/').reply(200, 'response')
    return expect(request('/')).to.become('response')
  })

  it('handles posts with data', () => {
    server.post('/', { a: 1 }).reply(200)
    return expect(
      request('/', {
        method: 'post',
        data: { a: 1 }
      })
    ).to.be.fulfilled()
  })

  it('throws Unauthorized for 401s', () => {
    server.get('/').reply(401, 'UnauthorizedType')
    return expect(request('/')).to.be.rejectedWith(Unauthorized)
  })

  it('throws NotFound for 404s', () => {
    server.get('/').reply(404)
    return expect(request('/')).to.be.rejectedWith(NotFound)
  })

  it('throws AppError for any other errors', () => {
    const someError = new Error('Some error')
    server.get('/').replyWithError(someError)
    return expect(request('/')).to.be.rejectedWith(AppError)
  })
})
