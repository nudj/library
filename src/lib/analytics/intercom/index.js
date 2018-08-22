const leadMethods = {
  create: require('./lib/leads/create'),
  getBy: require('./lib/leads/get'),
  update: require('./lib/leads/update'),
  getOrCreate: require('./lib/leads/get-or-create'),
  convertToUser: require('./lib/leads/convert-to-user'),
  tag: require('./lib/leads/tag')
}
const userMethods = {
  create: require('./lib/users/create'),
  getBy: require('./lib/users/get'),
  update: require('./lib/users/update'),
  getOrCreate: require('./lib/users/get-or-create'),
  logEvent: require('./lib/users/log-event'),
  tag: require('./lib/users/tag'),
  untag: require('./lib/users/untag')
}
const companyMethods = {
  getBy: require('./lib/companies/get'),
  create: require('./lib/companies/create'),
  update: require('./lib/companies/update'),
  getOrCreate: require('./lib/companies/get-or-create')
}

module.exports = {
  lead: leadMethods,
  leads: leadMethods,
  user: userMethods,
  users: userMethods,
  company: companyMethods,
  companies: companyMethods
}
