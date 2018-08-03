const possessiveCase = string => {
  if (!string) return string
  return string.endsWith('s') ? `${string}'` : `${string}'s`
}

module.exports = possessiveCase
