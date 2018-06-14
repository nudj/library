const getReferralUrl = ({ protocol = 'https', hostname, referral }) =>
  `${protocol}://${hostname}/r/${referral}`

module.exports = getReferralUrl
