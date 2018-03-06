const BoundaryError = require('./boundary-error')

class NotFound extends BoundaryError {
  constructor (options) {
    super('NotFound', options)
  }
}

module.exports = NotFound
