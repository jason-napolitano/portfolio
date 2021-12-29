/* library imports */
const packageJSON = require('../../package.json')

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

/**
 * Determines if the user is likely using an
 * ad block extension
 *
 * @returns {Promise<boolean>}
 */
export async function checkAdBlocker() {
  // Used to cache the result
  let isBlocked

  const tryRequest = async () => {
    try {
      return fetch(
        // Check to see if adsbygoogle.js can be loaded
        new Request(
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
          {
            method: 'HEAD',
            mode: 'no-cors',
          }
        )
      )
        .then(() => {
          // adsbygoogle.js request succeeded, so likely
          // there is no ad blocker
          isBlocked = false
          return isBlocked
        })
        .catch(() => {
          // Request failed, likely due
          // to an ad blocker
          isBlocked = true
          return isBlocked
        })
    } catch (error) {
      // fetch API error; possible fetch not supported (old browser)
      // Marking as a blocker since there was an error and so
      // we can prevent continued requests when this function is run
      console.log(error)
      isBlocked = true
      return isBlocked
    }
  }

  return isBlocked !== undefined ? isBlocked : await tryRequest()
}
