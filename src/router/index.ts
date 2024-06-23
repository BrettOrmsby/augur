import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Augur'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: {
        title: 'Augur • Search'
      }
    },
    {
      path: '/404',
      component: () => import('../views/404View.vue'),
      meta: {
        title: 'Augur Not Found'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect() {
        return { path: '/404' }
      }
    }
  ]
})

router.beforeEach((to, _, next) => {
  document.title = to.meta.title?.toString() || ''

  next()
})

export default router
