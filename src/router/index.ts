import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  useRoute
} from 'vue-router'
import routes from './routes'
import NProgress from '../plugins/nProgress'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const WITHE_LIST: string[] = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  NProgress.done()
})

router.afterEach(() => {})

export default router
