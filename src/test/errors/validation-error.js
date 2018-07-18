/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { statusCodes } = require('../../lib/errors/constants')
const { ValidationError, AppError } = require('../../errors')

const errors = [
  {
    type: statusCodes.ALREADY_EXISTS,
    fields: 'company.name',
    value: 'Bad Company',
    message: 'Bad Company already exists!'
  }
]

describe('ValidationError', () => {
  it('has the correct name', () => {
    const error = new ValidationError({ errors })
    expect(error).to.have.property('name', 'ValidationError')
  })

  it('has the correct message', () => {
    const error = new ValidationError({
      message: 'Oh no, it broke',
      errors
    })
    expect(error).to.have.property('message', 'Oh no, it broke')
  })

  it('has a default error code', () => {
    const error = new ValidationError({ errors })

    expect(error).to.have.property('code', statusCodes.BAD_REQUEST)
  })

  it('can be given an error code', () => {
    const error = new ValidationError({ code: 422, errors })
    expect(error).to.have.property('code', 422)
  })

  it('takes an `errors` object', () => {
    const error = new ValidationError({ errors })
    expect(error.errors).to.equal(errors)
  })

  it('throws an AppError if no `errors` are provided', () => {
    expect(() => new ValidationError({ message: 'no errors' })).to.throw(
      AppError, 'ValidationError requires an errors array'
    )
  })

  it('has log property if extra params passed in', () => {
    const error = new ValidationError({ errors, log: [1, 2, 3] })
    expect(error).to.have.property('log').to.deep.equal([1, 2, 3])
  })
})
