const BoundaryError = require('./boundary-error')
const AppError = require('./app-error')

class Redirect extends BoundaryError {
  constructor (options = {}) {
    const { url, notification } = options
    if (!url) throw new AppError('Redirect requires a `url` option')
    super('Redirect', options)
    this.url = url
    this.notification = notification
  }
}

module.exports = Redirect
