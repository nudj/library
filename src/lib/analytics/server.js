const MixpanelAdaptor = require('./adaptors/mixpanel/server') // Update to change main analytics package
const DisabledAdaptor = require('./adaptors/disabled')

// Disable analytics at this level to maximise compatibility with a custom adaptor
const Analytics = process.env.ANALYTICS_ENABLED === 'true' ? MixpanelAdaptor : DisabledAdaptor

module.exports = Analytics
