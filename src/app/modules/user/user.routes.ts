import { Router } from 'express'
import { userControllers } from './user.controllers'
import auth from '../../middleware/Auth'

const router = Router()

router.get(
  '/donors',
  auth('admin', 'super-admin'),
  userControllers.getAllDonors,
)
router.put(
  '/:userId/changeBlockState',
  auth('admin', 'super-admin'),
  userControllers.changeBlockState,
)

export const userRoutes = router
