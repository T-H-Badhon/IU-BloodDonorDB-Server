import { Router } from 'express'
import { authControllers } from './auth.controllers'
import auth from '../../middleware/Auth'
import { checkSuperAdminCode } from '../../middleware/SuperAdminCheck'
import validate from '../../middleware/ValidationFunction'
import { userValidationSchema } from '../user/user.validationSchema'
import { adminValidationSchema } from '../admin/admin.validationSchema'
import { donorValidationSchema } from '../donor/donor.validationSchema'

const router = Router()

router.post(
  '/registerAdmin',
  checkSuperAdminCode,
  validate(userValidationSchema),
  validate(adminValidationSchema),
  authControllers.registerAdmin,
)
router.post(
  '/registerDonor',
  validate(userValidationSchema),
  validate(donorValidationSchema),
  authControllers.registerDonor,
)
router.post('/login', authControllers.login)
router.put(
  '/change-password',
  auth('admin', 'donor'),
  authControllers.changePassword,
)
router.post('/forget-password', authControllers.forgetPassword)

export const authRoutes = router
