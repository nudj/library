const isError = require('lodash/isError')

// Rather than promisifying the specific action, combining mixpanel and the
// function name (E.g., `promisify(mixpanel, 'track')`) allows `this` to
// still be defined internally, and avoids `this._set is not a function`-like issues
const promisify = (service, action) => {
  return (...args) => new Promise((resolve, reject) => {
    service[action](...args, result => {
      return isError(result) ? reject(result) : resolve(result)
    })
  })
}

module.exports = promisify
