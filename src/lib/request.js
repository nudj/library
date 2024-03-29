const Axios = require('axios')
const shortid = require('shortid')
const get = require('lodash/get')

const { Unauthorized, NotFound, AppError } = require('./errors')

const config = {
  baseURL: '/',
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}
if (process.title.includes('node')) {
  config.baseURL = `http://${process.env.API_HOST}:${process.env.API_PORT}/`
}
const axios = Axios.create(config)
module.exports = async (...args) => {
  const requestId = shortid.generate()
  try {
    const response = await axios(...args)
    return response.data
  } catch (error) {
    switch (get(error, 'response.status')) {
      case 401:
        throw new Unauthorized(
          { type: error.response.data },
          error.message,
          'request',
          requestId,
          ...args
        )
      case 404:
        throw new NotFound(error.message, 'request', requestId, ...args)
      default:
        throw new AppError(error.message, 'request', requestId, ...args)
    }
  }
}
