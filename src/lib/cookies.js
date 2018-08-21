const getSecureName = name => `__SecureNudj${name[0].toUpperCase()}${name.slice(1)}`

module.exports = {
  set: (res, name, value) => res.cookie(getSecureName(name), value, {
    httpOnly: true,
    secure: true
  }),
  get: (req, name) => req.cookies[getSecureName(name)],
  clear: (res, name) => res.clearCookie(getSecureName(name)),
  getSecureName
}
