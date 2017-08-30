const makeSlug = function (name) {
  return name.toLowerCase()
      .replace(/[\s_]+/g, ' ')
      .replace(/\s/g, '-')
      .replace(/[^a-z0-9-]/g, '')
}

module.exports = makeSlug
