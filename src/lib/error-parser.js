const parseErrorMessage = (pageErrors, serverError) => {
  const [type, key, defaultMessage] = serverError.split('|')

  if (!pageErrors[type] || !pageErrors[type][key]) {
    return defaultMessage
  }

  return pageErrors[type][key]
}

const errorParser = (pageErrors = {}) => (serverError) => parseErrorMessage(pageErrors, serverError)

module.exports = errorParser
