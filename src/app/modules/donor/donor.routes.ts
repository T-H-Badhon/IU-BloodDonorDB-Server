import { Router } from 'express'
import { donorControllers } from './donor.controllers'
import auth from '../../middleware/Auth'

const router = Router()

router.get('/:bloodGroup', donorControllers.getDonorListByBloodGroup)

router.get('/:donorId', donorControllers.getDonorInfo)

router.get('/profile', auth('donor'), donorControllers.getProfile)

router.put('/profile', auth('donor'), donorControllers.updateProfile)

router.delete('/profile', auth('donor'), donorControllers.deleteProfile)

export const donorRoutes = router
