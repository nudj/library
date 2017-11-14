const Axios = require('axios')
const shortid = require('shortid')

const logger = require('./logger')

const config = {
  baseURL: '/',
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}
try {
  if (process.title.includes('node')) {
    config.baseURL = 'http://localhost:82/'
  }
} catch (error) {
  logger('info', 'Browser')
}
const axios = Axios.create(config)
module.exports = (...args) => {
  const requestId = shortid.generate()
  logger('debug', new Date().toISOString(), 'REQUEST', requestId, ...args)
  return axios(...args)
    .then(response => {
      logger(
        'debug',
        new Date().toISOString(),
        'RESPONSE',
        requestId,
        ...args,
        response.data
      )
      return response.data
    })
    .catch(error => {
      logger(
        'debug',
        new Date().toISOString(),
        'RESPONSE',
        requestId,
        ...args,
        error
      )
      throw error
    })
}
