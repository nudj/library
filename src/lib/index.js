const deepmerge = require('deepmerge')
const curry = require('lodash/curry')

const makeSlug = function (name) {
  return name.toLowerCase()
      .replace(/[\s_]+/g, ' ')
      .replace(/\s/g, '-')
      .replace(/[^a-z0-9-]/g, '')
}

// make merge non-destructive (emulates immutability)
const merge = (...objs) => deepmerge.all([{}, ...objs], { clone: true })

const promiseMap = (promiseObj) => {
  let promiseArr = []
  let keyMap = {}
  Object.keys(promiseObj).forEach((key, i) => {
    keyMap[i] = key
    promiseArr[i] = promiseObj[key]
  })
  return Promise.all(promiseArr).then((resolvedArr) => {
    return resolvedArr.reduce((resolvedObj, v, i) => {
      resolvedObj[keyMap[i]] = v
      return resolvedObj
    }, {})
  })
}

const promiseChain = curry((actions, data) => actions[0] ? actions[0](data).then(promiseChain(actions.slice(1))) : data)

const addDataKeyValue = (key, action) => data => {
  data[key] = action(data)
  return promiseMap(data)
}

module.exports = {
  makeSlug,
  merge,
  promiseMap,
  promiseChain,
  addDataKeyValue
}
