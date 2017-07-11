const deepmerge = require('deepmerge')

// make merge non-destructive (emulates immutability)
const merge = (...objs) => deepmerge.all([{}, ...objs], { clone: true })

module.exports = {
  merge
}
