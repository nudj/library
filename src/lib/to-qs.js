const toQs = (filters = {}) => {
  return Object.keys(filters).map((key) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`
  }).join('&')
}

module.exports = toQs
