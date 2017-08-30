const curry = require('lodash/curry')
const actionMap = require('./action-map')
const actionChain = require('./action-chain')

const actionAccumulator = curry((actionsObject, data) => {
  return actionMap(actionsObject, data).then(newData => Object.assign(data, newData))
})

const actionMapAssign = (...actionsArray) => {
  return actionChain(actionsArray.map(actionsObject => actionAccumulator(actionsObject)), {})
}

module.exports = actionMapAssign
