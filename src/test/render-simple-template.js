/* eslint-env mocha */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const renderSimpleTemplate = require('../lib/render-simple-template')

describe('renderSimpleTemplate', () => {
  it('returns the filled in template', () => {
    const template = 'Hello, {{name}}'
    const data = { name: 'World' }

    expect(renderSimpleTemplate({ template, data })).to.deep.equal([['Hello, ', 'World']])
  })
})
