const parseErrorMessage = (pageErrors, serverError) => {
  if (!serverError) return

  const [type, key, defaultMessage] = serverError.split('|')

  if (!defaultMessage) {
    throw new Error('Invalid server error format')
  }

  return (pageErrors[type] && pageErrors[type][key]) || defaultMessage
}

const errorParser = (pageErrors = {}) => {
  return serverError => parseErrorMessage(pageErrors, serverError)
}

module.exports = errorParser
