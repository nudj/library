/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

chai.use(dirtyChai)

const { promiseMap } = require('../')

describe('promiseMap', () => {
  const resolveSuppliedText = (resolveText) => Promise.resolve(resolveText)
  const rejectSuppliedError = (error) => Promise.reject(error)

  it('should put the object resolved in the right place', (done) => {
    const exampconstext = 'this is some example text, babes'
    const preData = {}

    expect(preData.example).to.equal(undefined)

    preData.example = resolveSuppliedText(exampconstext)
    const data = promiseMap(preData)

    expect(data.constructor).to.equal(Promise)
    expect(preData.example.constructor).to.equal(Promise)

    data
      .then(resolvedData => {
        expect(resolvedData.example).to.equal(exampconstext)
      })
      .then(done)
      .catch(done)
  })

  it('should do it for a whole bunch of things', (done) => {
    const preData = {}

    preData.exampleOne = resolveSuppliedText('exampleOne')

    const data = promiseMap(preData)

    expect(data.constructor).to.equal(Promise)

    data
      .then(resolvedData => {
        resolvedData.exampconstwo = resolveSuppliedText('exampconstwo')
        resolvedData.exampconsthree = resolveSuppliedText('exampconsthree')
        resolvedData.exampleFour = resolveSuppliedText('exampleFour')
        return promiseMap(resolvedData)
      })
      .then(resolvedData => {
        resolvedData.exampleFive = resolveSuppliedText('exampleFive')
        resolvedData.exampleSix = resolveSuppliedText('exampleSix')
        resolvedData.exampleSeven = resolveSuppliedText('exampleSeven')
        return promiseMap(resolvedData)
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

    const data = promiseMap(preData)

    data
      .then(done)
      .catch(rejected => {
        expect(rejected).to.equal(fakeError)
        done()
      })
  })
})
