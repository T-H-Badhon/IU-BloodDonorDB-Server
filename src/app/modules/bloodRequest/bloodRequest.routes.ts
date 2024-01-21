import { Router } from 'express'
import { bloodRequestControllers } from './bloodRequest.controllers'
import auth from '../../middleware/Auth'
import validate from '../../middleware/ValidationFunction'
import { bloodRequestValidationSchema } from './bloodRequest.validationSchema'

const router = Router()

router.post(
  '/create-request',
  auth('donor'),
  validate(bloodRequestValidationSchema),
  bloodRequestControllers.createRequest,
)
router.get('/', auth('admin', 'donor'), bloodRequestControllers.getAllRequests)
router.get('/my-requests', auth('donor'), bloodRequestControllers.myRequests)
router.put(
  '/my-requests/:requestId',
  auth('donor'),
  bloodRequestControllers.updateRequest,
)
router.delete(
  '/my-requests/:requestId',
  auth('donor'),
  bloodRequestControllers.deleteRequest,
)
router.delete(
  '/:requestId',
  auth('admin'),
  bloodRequestControllers.deleteRequest,
)

export const bloodRequestRoutes = router
