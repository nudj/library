const promiseMap = require('./promise-map')

const addDataKeyValue = (key, action) => data => {
  data[key] = action(data)
  return promiseMap(data)
}

module.exports = addDataKeyValue
