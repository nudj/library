const handleRequest = async (response) => {
  const { status, statusCode, body } = await response
  const code = status || statusCode
  if (code && code !== 200) {
    throw new Error(`Intercom gone done broke: ${code}`)
  }
  return body
}

module.exports = handleRequest
