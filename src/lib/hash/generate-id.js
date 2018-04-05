// NB: In use in production - DO NOT EDIT

const nodeCrypto = require('crypto')
const { idTypes } = require('../constants')

module.exports = (cryptoAlgorithm) => {
  const crypto = cryptoAlgorithm || nodeCrypto
  const { COMPANY, ROLE, PERSON, CONNECTION } = idTypes

  const generateHash = (input) => crypto
    .createHash('md5')
    .update(input || crypto.randomBytes(20).toString('hex'))
    .digest('hex')

  const generateIdByKey = (type, key) => (object) => {
    if (!object[key]) {
      throw new Error(`Unable to generate id for ${type} with input ${JSON.stringify(object)}`)
    }
    return generateHash(object[key])
  }

  const generateIdForConnection = (object) => {
    if (!object.person || !object.from) {
      throw new Error(`Unable to generate id for connection with input ${JSON.stringify(object)}`)
    }
    return generateHash(`${object.person}.${object.from}`)
  }

  const idGenerators = {
    [COMPANY]: generateIdByKey(COMPANY, 'name'),
    [ROLE]: generateIdByKey(ROLE, 'name'),
    [PERSON]: generateIdByKey(PERSON, 'email'),
    [CONNECTION]: generateIdForConnection
  }

  const generateId = (type, object) => {
    if (!type || !object || !idGenerators[type]) return generateHash()

    return idGenerators[type](object)
  }

  return generateId
}
