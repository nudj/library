const intercom = require('../api')
const getCompanyBy = require('./get')
const {
  handleAction,
  resolveRequest
} = require('../../helpers')

const fetchCompany = ({ id, name }) => {
  if (id) return getCompanyBy({ company_id: id })
  return getCompanyBy({ name })
}

const updateCompany = async ({ company, data }) => {
  const { company_id } = await fetchCompany(company)
  return resolveRequest(intercom.companies.update({ company_id, ...data }))
}

module.exports = handleAction(updateCompany)
