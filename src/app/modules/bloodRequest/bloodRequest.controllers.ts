import { catchAsync } from '../../utilitis/catchAsync'
import { bloodRequestServices } from './bloodRequest.services'

const createRequest = catchAsync(async (req, res) => {
  const { requestData } = req.body

  const result = await bloodRequestServices.createRequest(requestData)
})

const getAllRequests = catchAsync(async (req, res) => {
  const result = await bloodRequestServices.getAllRequest()
})

const getRequestDetails = catchAsync(async (req, res) => {
  const id = req.params.requestId

  const result = await bloodRequestServices.getRequestDetails(id)
})

const myRequests = catchAsync(async (req, res) => {
  const id = req.user._id

  const result = await bloodRequestServices.myRequests(id)
})

const updateRequest = catchAsync(async (req, res) => {
  const id = req.params.requestId

  const result = await bloodRequestServices.updateRequest(id)
})

const deleteRequest = catchAsync(async (req, res) => {
  const id = req.params.requestId

  const result = await bloodRequestServices.deleteRequest(id)
})

export const bloodRequestControllers = {
  createRequest,
  getAllRequests,
  getRequestDetails,
  myRequests,
  updateRequest,
  deleteRequest,
}
