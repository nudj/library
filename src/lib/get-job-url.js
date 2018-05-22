const getJobUrl = (args) => {
  const {
    protocol = 'https',
    hostname,
    company,
    job,
    referralId
  } = args

  const url = `${protocol}://${hostname}/companies/${company}/jobs/${job}`

  return referralId
    ? `${url}?referralId=${referralId}`
    : url
}

module.exports = getJobUrl
