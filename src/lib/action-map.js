const actionMap = (actionObj, data) => {
  const actionArr = []
  const keyMap = {}
  Object.keys(actionObj).forEach((key, i) => {
    keyMap[i] = key
    actionArr[i] = actionObj[key]
  })
  const promises = actionArr.map(action => typeof action === 'function' ? action(data) : action)
  return Promise.all(promises).then((resolvedArr) => {
    return resolvedArr.reduce((resolvedObj, v, i) => {
      resolvedObj[keyMap[i]] = v
      return resolvedObj
    }, {})
  })
}

module.exports = actionMap
