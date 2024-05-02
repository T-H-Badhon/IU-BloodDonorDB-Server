import { Router } from 'express'
import { adminControllers } from './admin.controllers'
import auth from '../../middleware/Auth'
import validate from '../../middleware/ValidationFunction'
import { updateAdminValidationSchema } from './admin.validationSchema'

const router = Router()

router.get('/me', auth('admin', 'super-admin'), adminControllers.profile)
router.put(
  '/me',
  auth('admin', 'super-admin'),
  validate(updateAdminValidationSchema),
  adminControllers.updateProfile,
)
router.delete(
  '/me',
  auth('admin', 'super-admin'),
  adminControllers.deleteProfile,
)

export const adminRoutes = router
