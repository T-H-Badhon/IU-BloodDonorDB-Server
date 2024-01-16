import { Router } from 'express'
import { adminControllers } from './admin.controllers'
import auth from '../../middleware/Auth'

const router = Router()

router.get('/me', auth('admin'), adminControllers.profile)
router.put('/me', auth('admin'), adminControllers.updateProfile)

export const adminRoutes = router
