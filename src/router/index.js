import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

/**
 * Router instance
 *
 * @type {Router}
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
