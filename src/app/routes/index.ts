import { Router } from 'express'

const router = Router()

const moduleRoutes = [
  {
    path: '/abc',
    route: abc,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
