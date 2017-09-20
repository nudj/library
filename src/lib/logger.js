module.exports = (type, ...args) => {
  const methods = {
    info: 'log',
    log: 'log',
    warn: 'warn',
    error: 'error'
  }
  if (process.env.ENVIRONMENT !== 'test') {
    if (!methods[type]) {
      throw new Error(`Invalid log type: ${type}`)
    }
    console[methods[type]](...args)
  }
}
