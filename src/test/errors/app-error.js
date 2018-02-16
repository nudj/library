/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { AppError } = require('../../errors')

describe('AppError', () => {
  it('has the correct name', () => {
    const error = new AppError()
    expect(error).to.have.property('name', 'AppError')
  })

  it('has the correct message', () => {
    const error = new AppError({ message: 'someMessage' })
    expect(error).to.have.property('message', 'someMessage')
  })

  it('has the correct code', () => {
    const error = new AppError({ message: 'someMessage', code: 'ApErr' })
    expect(error).to.have.property('code', 'ApErr')
  })

  it('can log a simple message string', () => {
    const error = new AppError('someMessage')
    expect(error).to.have.property('message', 'someMessage')
  })

  it('has log property if extra params passed in', () => {
    const error = new AppError({ message: 'someMessage', log: [1, 2, 3] })
    expect(error).to.have.property('log').to.deep.equal([1, 2, 3])
  })
})
