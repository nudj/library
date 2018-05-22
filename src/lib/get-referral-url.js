const getReferralUrl = ({ protocol = 'https', hostname, referralId }) =>
  `${protocol}://${hostname}/r/${referralId}`

module.exports = getReferralUrl
