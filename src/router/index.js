import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

/**
 * Router instance
 *
 * @type {Router}
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
