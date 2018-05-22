/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { getJobUrl } = require('../')

describe('getJobUrl', () => {
  it('should return a string in the right format', () => {
    const args = {
      protocol: 'https',
      hostname: 'web.co',
      company: 'nudj',
      job: 'frontend'
    }

    expect(getJobUrl(args)).to.equal('https://web.co/companies/nudj/jobs/frontend')
  })

  it('should append a referralId onto the end of the URL if supplied', () => {
    const args = {
      protocol: 'https',
      hostname: 'web.co',
      company: 'nudj',
      job: 'frontend',
      referralId: '123'
    }

    expect(getJobUrl(args)).to.equal('https://web.co/companies/nudj/jobs/frontend?referralId=123')
  })
})
