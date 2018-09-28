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
  page: 'Page',
  server: 'Server'
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
    created: 'created',
    updated: 'updated'
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
    socialShareClicked: 'social share clicked',
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
    loggedIn: 'logged in',
    requestedDemo: 'requested demo',
    clickedHireCTA: 'clicked hire CTA',
    clickedBlog: 'clicked blog',
    clickedReleaseNotes: 'clicked release notes',
    clickedTermsAndPrivacy: 'clicked terms and privacy',
    clickedRoadmap: 'clicked release notes',
    clickedHelp: 'clicked help'
  },
  linkedIn: {
    opened: 'opened',
    refreshed: 'refreshed',
    downloaded: 'downloaded'
  },
  page: {
    viewed: 'viewed',
    notFound: 'not found' // For a 404 page
  },
  server: {
    errored: 'errored' // For a 500 page - "Server 500'd" doesn't read as well
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
