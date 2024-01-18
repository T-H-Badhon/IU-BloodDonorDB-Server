import { Router } from 'express'
import { authControllers } from './auth.controllers'
import auth from '../../middleware/Auth'
import { checkSuperAdminCode } from '../../middleware/SuperAdminCheck'

const router = Router()

router.post(
  '/registerAdmin',
  checkSuperAdminCode,
  authControllers.registerAdmin,
)
router.post('/registerDonor', authControllers.registerDonor)
router.post('/login', authControllers.login)
router.put(
  '/change-password',
  auth('admin', 'donor'),
  authControllers.changePassword,
)
router.post('/forget-password', authControllers.forgetPassword)

export const authRoutes = router
