class BoundaryError extends Error {
  constructor (name, options) {
    super(options.message || 'Something went wrong')
    this.name = name
    this.code = options.code || 'GENERIC'
    this.log = []
  }
}

class Redirect extends BoundaryError {
  constructor (options = {}) {
    const { url, notification } = options
    if (!url) throw new AppError('Redirect requires a `url` option')
    super('Redirect', options)
    this.url = url
    this.notification = notification
  }
}

class NotFound extends BoundaryError {
  constructor (options) {
    super('NotFound', options)
  }
}

class Unauthorized extends BoundaryError {
  constructor (options) {
    if (!options || !options.code) throw new AppError('Unauthorized requires a `type` option')
    super('Unauthorized', options)
  }
}

class AppError extends BoundaryError {
  constructor (options) {
    super('AppError', options)
  }
}

function logThenThrow (error, ...log) {
  // error.log = error.log ? error.log.concat([log]) : [log]
  throw error
}

module.exports = {
  Redirect,
  NotFound,
  Unauthorized,
  AppError,
  logThenThrow
}
