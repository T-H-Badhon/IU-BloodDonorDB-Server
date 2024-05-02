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
router.get(
  '/',
  auth('admin', 'donor', 'super-admin'),
  bloodRequestControllers.getAllRequests,
)
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
<<<<<<< HEAD
  auth('admin', 'super-admin'),
  bloodRequestControllers.deleteRequest,
=======
  auth('admin'),
  bloodRequestControllers.deleteRequestByAdmin,
>>>>>>> 446f0869ce690da6314e2e675e20a75fde70c383
)

export const bloodRequestRoutes = router
