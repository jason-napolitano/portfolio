/* Component imports */
import LicenseView from '../views/License'
import ContactView from '../views/Contact'
import NotFound from '../views/NotFound'
import AboutView from '../views/About'
import HomeView from '../views/Home'

/* Routes array */
const routes = [
  {
    path: '/',
    name: 'home-view',
    component: HomeView,
    meta: {
      title: 'Homepage',
      showInNavbar: true,
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'about-view',
    component: AboutView,
    meta: {
      title: 'About Me',
      showInNavbar: true,
      requiresAuth: false,
    },
  },
  {
    path: '/contact',
    name: 'contact-view',
    component: ContactView,
    meta: {
      title: 'Contact Me',
      showInNavbar: true,
      requiresAuth: false,
    },
  },
  {
    path: '/license',
    name: 'license-view',
    component: LicenseView,
    meta: {
      title: 'License Information',
      showInNavbar: true,
      requiresAuth: false,
    },
  },
  // handle all 404 errors
  {
    path: '/:catchAll(.*)',
    name: 'not-found-view',
    component: NotFound,
    meta: {
      title: '404 Error',
      showInNavbar: false,
      requiresAuth: false,
    },
  },
]

export default routes
