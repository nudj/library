const getJobUrl = (args) => {
  const {
    protocol = 'https',
    hostname,
    company,
    job,
    referral
  } = args

  const url = `${protocol}://${hostname}/companies/${company}/jobs/${job}`

  return referral
    ? `${url}?referral=${referral}`
    : url
}

module.exports = getJobUrl
