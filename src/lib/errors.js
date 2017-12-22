class BoundaryError extends Error {
  constructor (name, message, ...log) {
    super(message)
    this.name = name
    this.log = [log]
  }
  addBoundaryLogs (...logs) {
    this.log.push(logs)
    throw this // eslint-disable-line no-throw-literal
  }
}

class Redirect extends BoundaryError {
  constructor (options = {}, message, ...log) {
    const { url, notification } = options
    if (!url) throw new AppError('Redirect requires a `url` option')
    super('Redirect', message, ...log)
    this.url = url
    this.notification = notification
  }
}

class NotFound extends BoundaryError {
  constructor (message, ...log) {
    super('NotFound', message, ...log)
  }
}

class Unauthorized extends BoundaryError {
  constructor (options, message, ...log) {
    if (!options || !options.type) throw new AppError('Unauthorized requires a `type` option')
    super('Unauthorized', message, ...log)
    this.type = options.type
  }
}

class AppError extends BoundaryError {
  constructor (message, ...log) {
    super('AppError', message, ...log)
  }
}

module.exports = {
  Redirect,
  NotFound,
  Unauthorized,
  AppError
}
