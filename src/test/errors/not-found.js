/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { NotFound } = require('../../errors')

describe('NotFound', () => {
  it('has the correct name', () => {
    const error = new NotFound()
    expect(error).to.have.property('name', 'NotFound')
  })

  it('has the correct message', () => {
    const error = new NotFound({ message: 'someMessage' })
    expect(error).to.have.property('message', 'someMessage')
  })

  it('has the correct code', () => {
    const error = new NotFound({ message: 'someMessage', code: 9000 })
    expect(error).to.have.property('code', 9000)
  })

  it('can log a simple message string', () => {
    const error = new NotFound('someMessage')
    expect(error).to.have.property('message', 'someMessage')
  })

  it('has log property if extra params passed in', () => {
    const error = new NotFound({ message: 'someMessage', log: [4, 6, 7] })
    expect(error).to.have.property('log').to.deep.equal([4, 6, 7])
  })
})
