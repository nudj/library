const getCompanyBy = require('./get')
const createCompany = require('./create')
const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')
const { handleAction } = require('../../helpers')

const formatCompanyDetails = ({ user_id, id, name }) => {
  return omitBy({ user_id, id, name }, isUndefined)
}

const getOrCreateCompany = async data => {
  let company = await getCompanyBy(formatCompanyDetails(data))
  if (!company) {
    company = await createCompany(data)
  }
  return company
}

module.exports = handleAction(getOrCreateCompany)
