const Axios = require('axios')
const shortid = require('shortid')

const config = {
  baseURL: '/',
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}
try {
  if (process.title.includes('node')) {
    config.baseURL = 'http://localhost:82/'
  }
} catch (error) {
  console.log('Browser')
}
const axios = Axios.create(config)
module.exports = (...args) => {
  const requestId = shortid.generate()
  console.log((new Date()).toISOString(), 'REQUEST', requestId, ...args)
  return axios(...args)
    .then(response => {
      console.log((new Date()).toISOString(), 'RESPONSE', requestId, ...args, response.data)
      return response.data
    })
    .catch(error => {
      console.error((new Date()).toISOString(), 'RESPONSE', requestId, ...args, error)
      throw error
    })
}
