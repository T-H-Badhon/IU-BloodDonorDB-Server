import { Router } from 'express'
import { authControllers } from './auth.controllers'

const router = Router()

router.post('/registerAdmin', authControllers.registerAdmin)
router.post('/registerDonor', authControllers.registerDonor)
router.post('/login', authControllers.login)
router.put('/change-password', authControllers.changePassword)
router.post('/forget-password', authControllers.forgetPassword)

export const authRoutes = router
