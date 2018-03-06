/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { Redirect, AppError } = require('../../errors')

describe('Redirect', () => {
  it('throws error if no url provided', () => {
    expect(() => new Redirect()).to.throw(AppError)
  })

  it('has url property', () => {
    const error = new Redirect({
      url: 'someurl'
    })
    expect(error).to.have.property('url', 'someurl')
  })

  it('has the correct name', () => {
    const error = new Redirect({
      url: 'someurl'
    })
    expect(error).to.have.property('name', 'Redirect')
  })

  it('has the correct message', () => {
    const error = new Redirect({
      message: 'someMessage',
      url: 'someurl'
    })
    expect(error).to.have.property('message', 'someMessage')
  })

  it('has the correct code', () => {
    const error = new Redirect({
      message: 'someMessage',
      code: 'RDRCT',
      url: 'someurl'
    })
    expect(error).to.have.property('code', 'RDRCT')
  })

  it('has notification property if passed in options', () => {
    const error = new Redirect({
      url: 'someurl',
      notification: 'somenotfication'
    })
    expect(error).to.have.property('notification', 'somenotfication')
  })

  it('has log property if extra params passed in', () => {
    const error = new Redirect({
      url: 'someurl',
      message: 'someMessage',
      log: [
        1,
        2,
        3
      ]
    })
    expect(error).to.have.property('log').to.deep.equal([1, 2, 3])
  })
})
