/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { statusCodes, ALREADY_EXISTS } = require('../../lib/errors/constants')
const { ValidationError, AppError } = require('../../errors')

const errors = [
  {
    type: ALREADY_EXISTS,
    field: 'company.name',
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
    expect(error.errors).to.deep.equal(errors)
  })

  it('throws an AppError if no `errors` are provided', () => {
    expect(() => new ValidationError({ message: 'no errors' })).to.throw(
      AppError, 'ValidationError requires an errors array'
    )
  })

  it('throws an AppError if given an error with no value', () => {
    const partialError = {
      type: ALREADY_EXISTS,
      field: 'sodas'
    }
    expect(() => new ValidationError({ errors: [partialError] })).to.throw(
      AppError, 'Validation errors require a value'
    )
  })

  it('throws an AppError if given an error with no field', () => {
    const partialError = {
      type: ALREADY_EXISTS,
      value: 'I See Dead People'
    }
    expect(() => new ValidationError({ errors: [partialError] })).to.throw(
      AppError, 'Validation errors require a field'
    )
  })

  it('throws an AppError if given an error with no field', () => {
    const partialError = {
      value: 'Gavin',
      field: 'da.ghost'
    }
    expect(() => new ValidationError({ errors: [partialError] })).to.throw(
      AppError, 'Validation errors require a type'
    )
  })

  it('has log property if extra params passed in', () => {
    const error = new ValidationError({ errors, log: [1, 2, 3] })
    expect(error).to.have.property('log').to.deep.equal([1, 2, 3])
  })
})
