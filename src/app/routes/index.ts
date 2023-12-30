import { Router } from 'express'
import { authRoutes } from '../modules/auth/auth.routes'
import { userRoutes } from '../modules/user/user.routes'
import { donorRoutes } from '../modules/donor/donor.routes'
import { blogPostRoutes } from '../modules/blogPost/blogPost.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/donors',
    route: donorRoutes,
  },
  {
    path: '/admin',
    route: abc,
  },
  {
    path: '/blogs',
    route: blogPostRoutes,
  },
  {
    path: '/blood-request',
    route: abc,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
