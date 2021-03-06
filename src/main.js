/* -----------------------------------------------------------------------------
 * vue app
 * -------------------------------------------------------------------------- */
import { createApp } from 'vue'
import './styles/_index.scss'
import App from './App.vue'
const app = createApp(App)

/* -----------------------------------------------------------------------------
 * pwa support
 * -------------------------------------------------------------------------- */
import './utils/pwa/registerServiceWorker'

/* -----------------------------------------------------------------------------
 * helpers and utility functions
 * -------------------------------------------------------------------------- */
import { env, removeHyphens, toTitleCase, scrollTo } from './utils'

/* -----------------------------------------------------------------------------
 * state & route management
 * -------------------------------------------------------------------------- */
import router from './router'
import store from './store'
app.use(router).use(store)

// Let's configure some things with the routes
router.beforeEach(function (to, from, next) {
  // First, we scroll to the top of the window on each route call
  scrollTo()
    // Then, we set each routes meta title to attempt better SEO
    .then(() => {
      document.title = `${env('META_TITLE')} - ${
        to.meta.title ?? toTitleCase(removeHyphens(to.name)) ?? ''
      }`
    })
    // Then we call the next() function and continue onward!
    .then(() => {
      next()
    })
})

/* -----------------------------------------------------------------------------
 * primevue css, components, et al
 * -------------------------------------------------------------------------- */
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'

// primevue css
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.min.css'
import 'primeicons/primeicons.css'

// primevue init
app.use(PrimeVue, {
  inputStyle: 'outlined',
  ripple: true,
})

// primevue services
app.use(ConfirmationService)
app.use(ToastService)

// primevue global directives
app.directive('tooltip', Tooltip)

/* -----------------------------------------------------------------------------
 * iconify
 * -------------------------------------------------------------------------- */
import { addCollection, Icon } from '@iconify/vue'
import icons from './utils/iconify'
app.component('Icon', Icon)

// icons for offline use
icons.forEach((collection) => {
  addCollection(collection ?? {})
})

/* -----------------------------------------------------------------------------
 * app mounting
 * -------------------------------------------------------------------------- */
app.mount('#app')
