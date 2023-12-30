import { Router } from 'express'
import { adminControllers } from './admin.controllers'

const router = Router()

router.get('/me', adminControllers.profile)
router.put('/me', adminControllers.updateProfile)

export const adminRoutes = router
