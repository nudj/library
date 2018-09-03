const ExecutableEnvironment = require('exenv')
const noop = require('../../../../noop')

const dummyMixpanel = {
  track: noop,
  identify: noop,
  alias: noop
}

// https://github.com/mixpanel/mixpanel-js/issues/119
let mixpanel = dummyMixpanel
if (!ExecutableEnvironment.canUseDOM) {
  const mixpanelServer = require('mixpanel')
  mixpanel = mixpanelServer.init(process.env.MIXPANEL_API_TOKEN)
}

module.exports = mixpanel
