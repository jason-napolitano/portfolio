/* library imports */
import createPersistedState from 'vuex-persistedstate'
import { env, pkgJSON } from '../utils'
import { createStore } from 'vuex'

/** store instance */
const store = createStore({
  // plugins ------------------------
  plugins: [createPersistedState()],
  // state --------------------------------------
  state: {
    appVersion: pkgJSON('version'),
    appAuthor: pkgJSON('author'),
    appTitle: env('META_TITLE'),
  },

  // getters ------------------------------------
  getters: {
    /**
     * Returns the application version from package.json
     *
     * @param state
     * @returns {string|number}
     */
    getAppVersion: (state) => state.appVersion,
    /**
     * Returns the application author from package.json
     *
     * @param state
     * @returns {string|number}
     */
    getAppAuthor: (state) => state.appAuthor,
    /**
     * Returns the application title from the .env.* file
     *
     * @param state
     *
     * @returns {string}
     */
    getAppTitle: (state) => state.appTitle,
    /**
     * Returns a full year string
     *
     * @returns {number}
     */
    getFullYear() {
      const date = new Date()
      return date.getFullYear()
    },
  },
})

export default store
