function Redirect (options = {}, ...log) {
  const { url, notification } = options
  if (!url) throw new AppError('Redirect requires a `url` option')
  this.url = url
  this.notification = notification
  this.log = log
}
Redirect.prototype = Object.create(Error.prototype)
Redirect.prototype.constructor = Redirect
Redirect.prototype.name = 'Redirect'

function NotFound (...log) {
  this.log = log
}
NotFound.prototype = Object.create(Error.prototype)
NotFound.prototype.constructor = NotFound
NotFound.prototype.name = 'NotFound'

function Unauthorized (options = {}, ...log) {
  const { type } = options
  if (!type) throw new AppError('Unauthorized requires a `type` option')
  this.type = type
  this.log = log
}
Unauthorized.prototype = Object.create(Error.prototype)
Unauthorized.prototype.constructor = Unauthorized
Unauthorized.prototype.name = 'Unauthorized'

function AppError (...log) {
  this.log = log
}
AppError.prototype = Object.create(Error.prototype)
AppError.prototype.constructor = AppError
AppError.prototype.name = 'AppError'

module.exports = {
  Redirect,
  NotFound,
  Unauthorized,
  AppError
}
