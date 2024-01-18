import { Router } from 'express'
import { userControllers } from './user.controllers'
import auth from '../../middleware/Auth'

const router = Router()

router.get('/:userId', auth('admin'), userControllers.getSingleDonor)
router.get('/', auth('admin'), userControllers.getAllDonors)
router.put(
  '/:userId/changeBlockState',
  auth('admin'),
  userControllers.changeBlockState,
)

export const userRoutes = router
