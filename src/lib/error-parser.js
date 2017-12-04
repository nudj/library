const parseErrorMessage = (pageErrors, serverError) => {
  if (!serverError) return

  const errors = serverError.split('|').map(errorSegment => errorSegment.trim())
  const [type, key, defaultMessage] = errors

  if (!pageErrors[type] || !pageErrors[type][key]) {
    return defaultMessage
  }

  return pageErrors[type][key]
}

const errorParser = (pageErrors = {}) => {
  return (serverError) => parseErrorMessage(pageErrors, serverError)
}

module.exports = errorParser
