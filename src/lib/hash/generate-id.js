// NB: In use in production - DO NOT EDIT

const generateHash = require('./generate-hash')
const { idTypes } = require('../constants')

const { COMPANY, ROLE, PERSON, CONNECTION } = idTypes

const generateIdByKey = (type, key) => (object) => {
  if (!object[key]) throw new Error(`Invalid ${type}`)
  return generateHash(object[key])
}

const generateIdForConnection = (object) => {
  if (!object.person || !object.from) throw new Error('Invalid connection')
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

module.exports = generateId
