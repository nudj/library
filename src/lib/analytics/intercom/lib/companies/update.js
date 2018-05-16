const intercom = require('../api')
const getCompanyBy = require('./get')
const {
  handleAction,
  handleRequest
} = require('../../helpers')

const fetchCompany = ({ id, name }) => {
  if (id) return getCompanyBy({ company_id: id })
  return getCompanyBy({ name })
}

const updateCompany = async ({ company, data }) => {
  const { company_id } = await fetchCompany(company)
  return handleRequest(intercom.companies.update({ company_id, ...data }))
}

module.exports = handleAction(updateCompany)
