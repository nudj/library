module.exports = (type, ...args) => {
  const methods = {
    info: 'log',
    log: 'log',
    warn: 'warn',
    error: 'error'
  }
  if (!methods[type]) {
    throw new Error(`Invalid log type: ${type}`)
  }
  if (process.env.ENVIRONMENT !== 'test') {
    console[methods[type]](...args)
  }
}
