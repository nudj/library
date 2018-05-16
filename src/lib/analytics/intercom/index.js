module.exports = {
  // Leads
  createLead: require('./lib/leads/create'),
  getLeadBy: require('./lib/leads/get'),
  updateLead: require('./lib/leads/update'),
  getOrCreateLead: require('./lib/leads/get-or-create'),
  convertLeadToUser: require('./lib/leads/convert-to-user'),
  tagLead: require('./lib/leads/tag'),

  // Users
  createUser: require('./lib/users/create'),
  getUserBy: require('./lib/users/get'),
  getOrCreateUser: require('./lib/users/get-or-create'),
  updateUser: require('./lib/users/update'),
  logUserEvent: require('./lib/users/log-event'),
  tagUser: require('./lib/users/tag'),

  // Companies
  getCompanyBy: require('./lib/companies/get'),
  createCompany: require('./lib/companies/create'),
  updateCompany: require('./lib/companies/update'),
  getOrCreateCompany: require('./lib/companies/get-or-create')
}
