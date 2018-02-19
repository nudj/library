const BoundaryError = require('./boundary-error')
const AppError = require('./app-error')

class Unauthorized extends BoundaryError {
  constructor (options) {
    if (!options || !options.type) {
      throw new AppError({ message: 'Unauthorized requires a `type` option' })
    }
    super('Unauthorized', options)
    this.type = options.type
  }
}

module.exports = Unauthorized
