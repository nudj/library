/* eslint-env mocha */

let chai = require('chai')
let dirtyChai = require('dirty-chai')
let expect = chai.expect

chai.use(dirtyChai)

let library = require('../lib')

describe('Library', function () {
  describe('merge', function () {
    it('merges two objects', function () {
      expect(library.merge({ a: 1 }, { b: 2 })).to.deep.equal({
        a: 1,
        b: 2
      })
    })
    it('overrides matching props', function () {
      expect(library.merge({ a: 1 }, { a: 2 })).to.deep.equal({
        a: 2
      })
    })
    it('handles nested objects', function () {
      expect(library.merge(
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
    it('is non-destructive', function () {
      let a = {
        a: 1,
        b: 1
      }
      let b = {
        a: 2
      }
      let result = library.merge(a, b)
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
})
