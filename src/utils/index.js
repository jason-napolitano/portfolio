/* library imports */
const packageJSON = require('../../package.json')

/**
 * Returns the count of a collection, string, or an array
 *
 * @param data {string|any[]}
 * @returns {number}
 */
export const count = (data) => data.length

/**
 * Wrapper to access process.env
 *
 * @param value {string}
 * @returns {string}
 */
export const env = (value) =>
  !value.startsWith('VUE_APP_')
    ? process.env[`VUE_APP_${value}`]
    : process.env[value]

/**
 * Gain access to package.json
 *
 * @param value {string}
 * @returns {string}
 */
export const pkgJSON = (value) => packageJSON[value]

/**
 * Check if a function exists
 *
 * @param name
 * @returns {boolean}
 */
export const functionExists = (name) => typeof name !== 'function'

/**
 * Removes hyphens (EG: '-' )  from a string
 *
 * @param phrase {string}
 * @returns {string}
 */
export const removeHyphens = (phrase) => phrase.replace(/-/g, ' ')

/**
 * Converts the first letter of each word in a multi-word
 * string to uppercase
 *
 * @param phrase {string}
 * @returns {string}
 */
export const toTitleCase = (phrase) =>
  phrase
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')

/**
 * Remove an extension from a filename (string)
 *
 * @param file {string}
 *
 * @returns {string}
 */
export const removeExtension = (file) => file.slice(0, -4)

/**
 * Parses a number value and returns the corresponding
 * comma-delineated string value
 *
 * @param number {number} The value to parse
 *
 * @returns {string}
 */
export const thousandsSeparator = (number) => {
  const num_parts = number.toString().split('.')
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return num_parts.join('.')
}

/**
 * A promise-based wrapper for window.scrollTo()
 *
 * @returns {Promise<any>}
 */
export const scrollTo = (x = 0, y = 0) => {
  return new Promise((resolve) => {
    resolve(() => {
      window.scrollTo(x, y)
    })
  })
}
