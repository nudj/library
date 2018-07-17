const getInvitationUrl = ({ protocol = 'https', hostname, hash }) => {
  return `${protocol}://${hostname}/invitation-accept/${hash}`
}

module.exports = getInvitationUrl
