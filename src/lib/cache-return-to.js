const cacheReturnTo = (req, res, next) => {
  if (!req.session.returnTo) {
    req.session.returnTo = req.get('Referrer')
  }
  next()
}

module.exports = cacheReturnTo
