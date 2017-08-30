/* eslint-env mocha */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const { emailBuilder } = require('../server')

chai.use(dirtyChai)

describe('emailBuilder', () => {
  it('should return a string', () => {
    expect(emailBuilder({})).to.be.a('string')
  })

  it('should populate the basic email headers', () => {
    const result = emailBuilder({})
    expect(result).to.include('Content-Type: text/html')
    expect(result).to.include('Date:')
    expect(result).to.include('MIME-Version: 1.0')
    expect(result).to.include('Message-Id:')
  })

  it('should populate the custom email headers', () => {
    const email = {
      from: 'myemail@test.com',
      to: 'test@email.com',
      cc: 'othertest@email.com',
      subject: 'Hello'
    }
    const result = emailBuilder(email)
    expect(result).to.include('From: myemail@test.com')
    expect(result).to.include('To: test@email.com')
    expect(result).to.include('Cc: othertest@email.com')
    expect(result).to.include('Subject: Hello')
  })

  it('should populate the body with custom input at the end of the result', () => {
    const email = {
      body: 'This is an email'
    }
    const result = emailBuilder(email)
    expect(result.slice(email.body.length * -1)).to.equal(email.body)
  })

  it('should not populate a body header', () => {
    const email = {
      body: 'This is an email'
    }
    const result = emailBuilder(email)
    expect(result).to.not.include('Body:')
  })

  it('should persist any HTML formatting', () => {
    const email = {
      body: '<h1>Hello!</h1>'
    }
    const result = emailBuilder(email)
    expect(result).to.include(email.body)
  })
})
