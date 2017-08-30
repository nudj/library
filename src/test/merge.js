/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { merge } = require('../')

describe('merge', () => {
  it('merges two objects', () => {
    expect(merge({ a: 1 }, { b: 2 })).to.deep.equal({
      a: 1,
      b: 2
    })
  })

  it('overrides matching props', () => {
    expect(merge({ a: 1 }, { a: 2 })).to.deep.equal({
      a: 2
    })
  })

  it('handles nested objects', () => {
    expect(merge(
      {
        a: {
          b: 1
        }
      },
      {
        a: {
          b: 2
        }
      }
    )).to.deep.equal({
      a: {
        b: 2
      }
    })
  })

  it('is non-destructive', () => {
    const a = {
      a: 1,
      b: 1
    }
    const b = {
      a: 2
    }
    const result = merge(a, b)
    expect(result).to.deep.equal({
      a: 2,
      b: 1
    })
    expect(a).to.deep.equal({
      a: 1,
      b: 1
    })
    expect(b).to.deep.equal({
      a: 2
    })
  })
})
