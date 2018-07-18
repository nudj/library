const BoundaryError = require('./boundary-error')
const AppError = require('./app-error')
const { statusCodes, INVALID, ALREADY_EXISTS } = require('./constants')

const errorMessageTemplates = {
  [ALREADY_EXISTS]: value => `${value} already exists`,
  [INVALID]: value => `${value} is invalid`
}

class ValidationError extends BoundaryError {
  constructor (options = {}) {
    if (!options.errors) throw new AppError('ValidationError requires an errors array')

    options.errors = options.errors.map(error => {
      if (!error.type) throw new AppError('Validation errors require a type')
      if (!error.value) throw new AppError('Validation errors require a value')
      if (!error.field) throw new AppError('Validation errors require a field')

      if (!error.message) {
        error.message = errorMessageTemplates[error.type](error.value)
      }
      return error
    })

    options.code = options.code || statusCodes.BAD_REQUEST
    options.message = options.message || 'Validation error'
    super('ValidationError', options)

    this.errors = options.errors
  }
}

module.exports = ValidationError
