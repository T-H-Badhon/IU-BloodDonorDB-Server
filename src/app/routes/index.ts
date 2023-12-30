import { Router } from 'express'
import { authRoutes } from '../modules/auth/auth.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/donor',
    route: abc,
  },
  {
    path: '/admin',
    route: abc,
  },
  {
    path: '/blogs',
    route: abc,
  },
  {
    path: '/blood-request',
    route: abc,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
