const BoundaryError = require('./boundary-error')
const AppError = require('./app-error')
const { statusCodes } = require('./constants')

class ValidationError extends BoundaryError {
  constructor (options = {}) {
    if (!options.errors) throw new AppError('ValidationError requires an errors array')

    options.code = options.code || statusCodes.BAD_REQUEST
    super('ValidationError', options)

    this.errors = options.errors
  }
}

module.exports = ValidationError
