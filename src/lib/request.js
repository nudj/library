const Axios = require('axios')

let config = {
  baseURL: '/',
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}
try {
  if (process.title === 'node') {
    config.baseURL = 'http://localhost:82/'
  }
} catch (error) {
  console.log('Browser')
}
const axios = Axios.create(config)
module.exports = ((...args) => axios(...args)).then((response) => response.data)
