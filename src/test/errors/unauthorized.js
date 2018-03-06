/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { Unauthorized, AppError } = require('../../errors')

describe('Unauthorized', () => {
  it('throws error if no type provided', () => {
    expect(() => new Unauthorized()).to.throw(AppError)
  })

  it('has type property', () => {
    const error = new Unauthorized({
      type: 'sometype'
    })
    expect(error).to.have.property('type', 'sometype')
  })

  it('has the correct name', () => {
    const error = new Unauthorized({
      type: 'sometype'
    })
    expect(error).to.have.property('name', 'Unauthorized')
  })

  it('has the correct message', () => {
    const error = new Unauthorized({
      type: 'sometype',
      message: 'someMessage'
    })
    expect(error).to.have.property('message', 'someMessage')
  })

  it('has log property if extra params passed in', () => {
    const error = new Unauthorized({
      type: 'sometype',
      message: 'someMessage',
      log: [ 1, 2, 3 ]
    })
    expect(error).to.have.property('log').to.deep.equal([1, 2, 3])
  })
})
