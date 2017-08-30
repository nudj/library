/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const { makeSlug } = require('../')

chai.use(dirtyChai)

describe('makeSlug', () => {
  it('returns an unmodified string if the original string was ok', () => {
    const okExample = 'example'
    expect(makeSlug(okExample)).to.equal(okExample)
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
    examples.forEach(example => expect(makeSlug(example[0])).to.equal(example[1]))
  })
})
