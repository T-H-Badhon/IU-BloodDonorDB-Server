import { Router } from 'express'
import { userControllers } from './user.controllers'

const router = Router()

router.get('/:userId', userControllers.getSingleUser)
router.get('/', userControllers.getAllUser)
router.put('/:userId/changeBlockState', userControllers.changeBlockState)

export const userRoutes = router
