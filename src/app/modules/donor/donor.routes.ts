import { Router } from 'express'
import { donorControllers } from './donor.controllers'
import auth from '../../middleware/Auth'
import validate from '../../middleware/ValidationFunction'
import { updateDonorValidationSchema } from './donor.validationSchema'

const router = Router()

router.get('/', donorControllers.getDonorListBySearch)

// router.get('/:donorId', donorControllers.getDonorInfo)

router.get('/donor/profile', auth('donor'), donorControllers.getProfile)

router.put(
  '/donor/profile',
  auth('donor'),
  validate(updateDonorValidationSchema),
  donorControllers.updateProfile,
)

router.delete('/donor/profile', auth('donor'), donorControllers.deleteProfile)

export const donorRoutes = router
