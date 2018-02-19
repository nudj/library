const BoundaryError = require('./boundary-error')

class AppError extends BoundaryError {
  constructor (options) {
    super('AppError', options)
  }
}

module.exports = AppError
