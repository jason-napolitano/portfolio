/* library imports */
import createPersistedState from 'vuex-persistedstate'
import { appStore } from './modules/app'
import { createStore } from 'vuex'

/** store instance */
const store = createStore({
  // plugins ------------------------
  plugins: [createPersistedState()],
  // load modules -------------------
  modules: {
    appStore, // app module
  },
})

export default store
