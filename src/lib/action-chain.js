const curry = require('lodash/curry')

const actionChain = curry((actions, data) => actions[0] ? actions[0](data).then(actionChain(actions.slice(1))) : data)

module.exports = actionChain
