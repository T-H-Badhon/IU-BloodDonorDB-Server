import { Router } from 'express'
import { bloodRequestControllers } from './bloodRequest.controllers'

const router = Router()

router.post('/create-request', bloodRequestControllers.createRequest)
router.get('/', bloodRequestControllers.getAllRequests)
router.get('/:requestId', bloodRequestControllers.getRequestDetails)
router.get('/my-requests', bloodRequestControllers.myRequests)
router.put('/my-requests/:requestId', bloodRequestControllers.updateRequest)
router.delete('/my-requests/:requestId', bloodRequestControllers.deleteRequest)
router.delete('/:requestId', bloodRequestControllers.deleteRequest)

export const bloodRequestRoutes = router
