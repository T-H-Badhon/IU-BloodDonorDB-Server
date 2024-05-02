import { Router } from 'express'
import { authControllers } from './auth.controllers'
import auth from '../../middleware/Auth'

import validate from '../../middleware/ValidationFunction'
import { userValidationSchema } from '../user/user.validationSchema'
import { adminValidationSchema } from '../admin/admin.validationSchema'
import { donorValidationSchema } from '../donor/donor.validationSchema'
import {
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  loginValidationSchema,
} from './auth.validationSchema'

const router = Router()

router.post(
  '/registerAdmin',
  auth('super-admin'),
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
router.post('/login', validate(loginValidationSchema), authControllers.login)
router.put(
  '/change-password',
  auth('admin', 'donor'),
  validate(changePasswordValidationSchema),
  authControllers.changePassword,
)
router.post(
  '/forget-password',
  validate(forgetPasswordValidationSchema),
  authControllers.forgetPassword,
)

export const authRoutes = router
