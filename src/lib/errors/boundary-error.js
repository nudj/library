class BoundaryError extends Error {
  constructor (name, options = {}) {
    options = typeof options === 'string' ? { message: options } : options
    super(options.message || 'Something went wrong')
    this.name = name
    this.code = options.code || 'GENERIC'
    this.log = options.log || []
  }
}

module.exports = BoundaryError
