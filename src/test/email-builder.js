/* eslint-env mocha */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const { emailBuilder } = require('../server')

chai.use(dirtyChai)

describe('Email Builder', () => {
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

  it('should populate the body with custom input', () => {
    const email = {
      body: 'This is an email'
    }
    const result = emailBuilder(email)
    expect(result).to.include('Body: This is an email')
    expect(result).to.include('Content-Transfer-Encoding: 7bit')
  })
})
