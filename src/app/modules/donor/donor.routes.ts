import { Router } from 'express'
import { donorControllers } from './donor.controllers'

const router = Router()

router.get('/:bloodGroup', donorControllers.getDonorListByBloodGroup)

router.get('/:donorId', donorControllers.getDonorInfo)

router.get('/profile', donorControllers.getProfile)

router.put('/profile', donorControllers.updateProfile)

router.delete('/profile', donorControllers.deleteProfile)

export const donorRoutes = router
