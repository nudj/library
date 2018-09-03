const eventObjects = {
  accessRequest: 'Access request',
  applicant: 'Applicant',
  company: 'Company',
  connection: 'Connection',
  connections: 'Connections',
  invite: 'Invite',
  invites: 'Invites',
  job: 'Job',
  message: 'Message',
  survey: 'Survey',
  user: 'User',
  linkedIn: 'LinkedIn',
  page: 'Page'
}

const eventActions = {
  accessRequest: {
    created: 'created',
    accepted: 'accepted'
  },
  applicant: {
    created: 'created',
    messaged: 'messaged',
    accepted: 'accepted'
  },
  company: {
    created: 'created'
  },
  connection: {
    created: 'created',
    selectedForMessage: 'selected for message'
  },
  connections: {
    uploaded: 'uploaded',
    filtered: 'filtered'
  },
  invite: {
    accepted: 'accepted'
  },
  invites: {
    sent: 'sent'
  },
  job: {
    created: 'created',
    edited: 'edited',
    referred: 'referred',
    sharedInternally: 'shared internally'
  },
  message: {
    sent: 'sent'
  },
  survey: {
    started: 'started',
    completed: 'completed'
  },
  user: {
    created: 'created',
    signedUp: 'signed up',
    loggedIn: 'logged in'
  },
  linkedIn: {
    opened: 'opened',
    refreshed: 'refreshed',
    downloaded: 'downloaded'
  },
  page: {
    viewed: 'viewed'
  }
}

const eventProperties = {
  app: {
    web: 'web',
    hire: 'hire',
    admin: 'admin'
  }
}

module.exports = {
  eventActions,
  eventObjects,
  eventProperties
}
