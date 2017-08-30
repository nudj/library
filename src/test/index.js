/* eslint-env mocha */

let chai = require('chai')
let dirtyChai = require('dirty-chai')
let expect = chai.expect

chai.use(dirtyChai)

let library = require('../')

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
  describe('addDataKeyValue', () => {
    const key = 'value'
    const action = () => new Promise(resolve => resolve(1))
    const actionData = data => new Promise(resolve => resolve(data.one + 1))
    const errorReject = new Error('REJECT')
    const actionReject = () => new Promise((resolve, reject) => reject(errorReject))

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
          expect(Object.keys(data)).to.deep.equal(['value'])
          done()
        })
    })

    it('should resolve with an object with keyed value as result of action', (done) => {
      library
        .addDataKeyValue(key, action)({})
        .then(data => {
          expect(data).to.deep.equal({
            value: 1
          })
          done()
        })
    })

    it('should pass data down to actions and append results to data', (done) => {
      library
        .addDataKeyValue(key, actionData)({ one: 1 })
        .then(data => {
          expect(data).to.deep.equal({
            one: 1,
            value: 2
          })
          done()
        })
    })

    it('should reject when action rejects', (done) => {
      library
        .addDataKeyValue(key, actionReject)({})
        .catch(error => {
          expect(error).to.equal(errorReject)
          done()
        })
    })
  })
  describe('actionMap', () => {
    const promiseObject = {
      primitive: 'primitiveResult',
      promise: Promise.resolve('promiseResult'),
      action: () => Promise.resolve('actionResult'),
      actionData: data => Promise.resolve('actionData' + data)
    }
    let data

    beforeEach(() => {
      data = library.actionMap(promiseObject, 'Result')
    })

    it('should return a promise', () => {
      expect(data).to.be.a('promise')
    })
    it('should resolve with a plain object', (done) => {
      data.then(result => {
        expect(result).to.be.an('object')
        done()
      })
    })
    it('should map primitives untouched', (done) => {
      data.then(result => {
        expect(result.primitive).to.equal('primitiveResult')
        done()
      })
    })
    it('should map result of sub promises', (done) => {
      data.then(result => {
        expect(result.promise).to.equal('promiseResult')
        done()
      })
    })
    it('should map result of actions', (done) => {
      data.then(result => {
        expect(result.action).to.equal('actionResult')
        done()
      })
    })
    it('should pass supplied data into actions', (done) => {
      data.then(result => {
        expect(result.actionData).to.equal('actionDataResult')
        done()
      })
    })
    it('should reject if sub promise rejects', (done) => {
      const rejectError = new Error('REJECT')
      library.actionMap({
        rejectPromise: Promise.reject(rejectError)
      })
      .catch(error => {
        expect(error).to.equal(rejectError)
        done()
      })
    })
    it('should reject if sub action rejects', (done) => {
      const rejectError = new Error('REJECT')
      library.actionMap({
        rejectAction: () => Promise.reject(rejectError)
      })
      .catch(error => {
        expect(error).to.equal(rejectError)
        done()
      })
    })
  })
  describe('actionChain', () => {
    const action1 = () => new Promise(resolve => resolve(1))
    const action2 = () => new Promise(resolve => resolve(2))
    const errorReject = new Error('REJECT')
    const actionReject = data => new Promise((resolve, reject) => reject(errorReject))

    it('should return a promise', () => {
      expect(library.actionChain([action1, action2], 0)).to.be.a('Promise')
    })

    it('should resolve when all the actions have resolved', (done) => {
      library
        .actionChain([action1, action2], 0)
        .then(() => {
          expect(true).to.be.true()
          done()
        })
    })

    it('should resolve with the final resolve value', (done) => {
      library
        .actionChain([action1, action2], 0)
        .then(result => {
          expect(result).to.equal(2)
          done()
        })
    })

    it('should pass each resolution to the next action', (done) => {
      const pIncrement = data => new Promise(resolve => resolve(data + 1))
      library
        .actionChain([pIncrement, pIncrement], 0)
        .then(result => {
          expect(result).to.equal(2)
          done()
        })
    })

    it('should reject with any errors', (done) => {
      library
        .actionChain([actionReject], 0)
        .catch(error => {
          expect(error).to.equal(errorReject)
          done()
        })
    })

    it('should reject with first error', (done) => {
      library
        .actionChain([actionReject, action2], 0)
        .catch(error => {
          expect(error).to.equal(errorReject)
          done()
        })
    })

    it('should reject after deep chain error', (done) => {
      library
        .actionChain([action1, actionReject], 0)
        .catch(error => {
          expect(error).to.equal(errorReject)
          done()
        })
    })

    it('should be curried', (done) => {
      const curried = library.actionChain([action1, action2])
      expect(curried).to.be.a('function')
      curried(0).then(result => {
        expect(result).to.equal(2)
        done()
      })
    })
  })
  describe('actionMapAssign', () => {
    const actionMap1 = {
      a1: () => Promise.resolve(1)
    }
    const actionMap2 = {
      a2: () => Promise.resolve(2)
    }
    const actionMapData = {
      aData: data => Promise.resolve(data.a1 + 1)
    }
    const actionReject = new Error('REJECT')
    const actionMapReject = {
      reject: () => Promise.reject(actionReject)
    }

    it('should return a promise', () => {
      expect(library.actionMapAssign(actionMap1, actionMap2)).to.be.a('promise')
    })
    it('should return an object', (done) => {
      library
        .actionMapAssign(actionMap1, actionMap2)
        .then(result => {
          expect(result).to.be.an('object')
          done()
        })
    })
    it('should return an accumulation of the results of all the resolved actionMaps', (done) => {
      library
        .actionMapAssign(actionMap1, actionMap2)
        .then(result => {
          expect(result).to.deep.equal({
            a1: 1,
            a2: 2
          })
          done()
        })
    })
    it('should pass the resolutions of previous actionMaps onto the next actionMap\'s actions', (done) => {
      library
        .actionMapAssign(actionMap1, actionMapData)
        .then(result => {
          expect(result).to.deep.equal({
            a1: 1,
            aData: 2
          })
          done()
        })
    })
    it('should should reject if any of the actionMaps reject', (done) => {
      library
        .actionMapAssign(actionMap1, actionMapReject)
        .catch(error => {
          expect(error).to.equal(actionReject)
          done()
        })
    })
  })
  describe('toQs', () => {
    it('should return a string', () => {
      expect(library.toQs()).to.be.a('string')
    })
    it('should return the key and value in query string format', () => {
      expect(library.toQs({
        key: 'value'
      })).to.equal('key=value')
    })
    it('should return multiple key/value pairs separated by an ampersand', () => {
      expect(library.toQs({
        key1: 'value1',
        key2: 'value2'
      })).to.equal('key1=value1&key2=value2')
    })
    it('should encode the query string keys and values', () => {
      expect(library.toQs({
        '@': '?'
      })).to.equal('%40=%3F')
    })
  })
})
