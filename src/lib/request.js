const Axios = require('axios')

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
module.exports = (...args) => axios(...args).then((response) => response.data)
