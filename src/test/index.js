/* eslint-env mocha */

let chai = require('chai')
let dirtyChai = require('dirty-chai')
let expect = chai.expect

chai.use(dirtyChai)

let library = require('../lib')

describe('Library', () => {
  describe('makeSlug', () => {
    it('returns an unmodified string if the original string was ok', () => {
      const okExample = 'example'
      expect(library.makeSlug(okExample)).to.equal(okExample)
    })
    it('removes all non-compliant characters and return a lower-case string', () => {
      const examples = [
        ['Example', 'example'],
        ['This example', 'this-example'],
        ['This is an Example', 'this-is-an-example'],
        ['LOUD NOISES!', 'loud-noises'],
        ['@yoyo@', 'yoyo'],
        ['Matt smells', 'matt-smells'],
        ['Matt-Smells', 'matt-smells'],
        ['matt_smells', 'matt-smells'],
        ['TH1$  1S AN   EXTR33333M     EXAMPL@@@@@!!!!', 'th1-1s-an-extr33333m-exampl']
      ]
      examples.forEach(example => expect(library.makeSlug(example[0])).to.equal(example[1]))
    })
  })
  describe('merge', () => {
    it('merges two objects', () => {
      expect(library.merge({ a: 1 }, { b: 2 })).to.deep.equal({
        a: 1,
        b: 2
      })
    })
    it('overrides matching props', () => {
      expect(library.merge({ a: 1 }, { a: 2 })).to.deep.equal({
        a: 2
      })
    })
    it('handles nested objects', () => {
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
    it('is non-destructive', () => {
      const a = {
        a: 1,
        b: 1
      }
      const b = {
        a: 2
      }
      const result = library.merge(a, b)
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
  describe('promiseMap', () => {
    const resolveSuppliedText = (resolveText) => Promise.resolve(resolveText)
    const rejectSuppliedError = (error) => Promise.reject(error)

    it('should put the object resolved in the right place', (done) => {
      const exampleText = 'this is some example text, babes'
      const preData = {}

      expect(preData.example).to.equal(undefined)

      preData.example = resolveSuppliedText(exampleText)
      const data = library.promiseMap(preData)

      expect(data.constructor).to.equal(Promise)
      expect(preData.example.constructor).to.equal(Promise)

      data
        .then(resolvedData => {
          expect(resolvedData.example).to.equal(exampleText)
        })
        .then(done)
        .catch(done)
    })

    it('should do it for a whole bunch of things', (done) => {
      const preData = {}

      preData.exampleOne = resolveSuppliedText('exampleOne')

      const data = library.promiseMap(preData)

      expect(data.constructor).to.equal(Promise)

      data
        .then(resolvedData => {
          resolvedData.exampleTwo = resolveSuppliedText('exampleTwo')
          resolvedData.exampleThree = resolveSuppliedText('exampleThree')
          resolvedData.exampleFour = resolveSuppliedText('exampleFour')
          return library.promiseMap(resolvedData)
        })
        .then(resolvedData => {
          resolvedData.exampleFive = resolveSuppliedText('exampleFive')
          resolvedData.exampleSix = resolveSuppliedText('exampleSix')
          resolvedData.exampleSeven = resolveSuppliedText('exampleSeven')
          return library.promiseMap(resolvedData)
        })
        .then(resolvedData => {
          const keys = Object.keys(resolvedData)
          expect(keys.length).to.equal(7)
          keys.forEach(key => {
            expect(resolvedData[key]).to.equal(key)
          })
        })
        .then(done)
        .catch(done)
    })

    it('should handle rejection', (done) => {
      const preData = {}
      const fakeError = 'fake error'

      preData.example = rejectSuppliedError(fakeError)

      const data = library.promiseMap(preData)

      data
        .then(done)
        .catch(rejected => {
          expect(rejected).to.equal(fakeError)
          done()
        })
    })
  })
  describe('promiseChain', () => {
    const action1 = () => new Promise(resolve => resolve(1))
    const action2 = () => new Promise(resolve => resolve(2))
    const errorReject = new Error('REJECT')
    const actionReject = data => new Promise((resolve, reject) => reject(errorReject))

    it('should return a promise', () => {
      expect(library.promiseChain([action1, action2], 0)).to.be.a('Promise')
    })

    it('should resolve when all the actions have resolved', (done) => {
      library
        .promiseChain([action1, action2], 0)
        .then(() => {
          expect(true).to.be.true()
          done()
        })
    })

    it('should resolve with the final resolve value', (done) => {
      library
        .promiseChain([action1, action2], 0)
        .then(result => {
          expect(result).to.equal(2)
          done()
        })
    })

    it('should pass each resolution to the next action', (done) => {
      const pIncrement = data => new Promise(resolve => resolve(data + 1))
      library
        .promiseChain([pIncrement, pIncrement], 0)
        .then(result => {
          expect(result).to.equal(2)
          done()
        })
    })

    it('should reject with any errors', (done) => {
      library
        .promiseChain([actionReject], 0)
        .catch(error => {
          expect(error).to.equal(errorReject)
          done()
        })
    })

    it('should reject with first error', (done) => {
      library
        .promiseChain([actionReject, action2], 0)
        .catch(error => {
          expect(error).to.equal(errorReject)
          done()
        })
    })

    it('should reject after deep chain error', (done) => {
      library
        .promiseChain([action1, actionReject], 0)
        .catch(error => {
          expect(error).to.equal(errorReject)
          done()
        })
    })
  })
  describe('addDataKeyValue', () => {
    const key = 'one'
    const action = () => new Promise(resolve => resolve(1))

    it('should return a function', () => {
      expect(library.addDataKeyValue(key, action)).to.be.a('Function')
    })

    it('should return a function that returns a promise', () => {
      expect(library.addDataKeyValue(key, action)({})).to.be.a('Promise')
    })

    it('should resolve with object', (done) => {
      library
        .addDataKeyValue(key, action)({})
        .then(data => {
          expect(data).to.be.an('Object')
          done()
        })
    })

    it('should resolve with an object with correct key', (done) => {
      library
        .addDataKeyValue(key, action)({})
        .then(data => {
          expect(Object.keys(data)).to.deep.equal(['one'])
          done()
        })
    })

    it('should resolve with an object with keyed value as result of action', (done) => {
      library
        .addDataKeyValue(key, action)({})
        .then(data => {
          expect(data).to.deep.equal({
            one: 1
          })
          done()
        })
    })
  })
})
