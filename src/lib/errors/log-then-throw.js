const logThenThrow = (error, ...log) => {
  error.log = error.log ? error.log.concat([log]) : [log]
  throw error
}

module.exports = logThenThrow
