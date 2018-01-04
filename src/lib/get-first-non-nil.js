const isNil = require('lodash/isNil')

module.exports = (...values) => {
  let returnVal

  for (let i = 0; i < values.length; i++) {
    const value = values[i]

    if (!isNil(value)) {
      returnVal = value
      break
    }
  }

  return returnVal
}
