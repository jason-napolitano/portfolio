/* library imports */
import { env, pkgJSON } from '../../utils'
import { supabase } from '../../utils/supabase'

/* vuex module */
export const appStore = {
  // state --------------------------------------
  state: {
    appVersion: pkgJSON('version'),
    appAuthor: pkgJSON('author'),
    appTitle: env('META_TITLE'),
    isLoggedIn: supabase.auth.user(),
  },

  // mutations ----------------------------------
  mutations: {
    // ...
  },

  // actions ------------------------------------
  actions: {
    // ...
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
    isLoggedIn: (state) => state.isLoggedIn,
  },
}
