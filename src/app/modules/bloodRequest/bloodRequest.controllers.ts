import httpStatus from 'http-status'
import { catchAsync } from '../../utilitis/catchAsync'
import response from '../../utilitis/response'
import { bloodRequestServices } from './bloodRequest.services'

const createRequest = catchAsync(async (req, res) => {
  const { requestData } = req.body

  const { _id } = req.user

  const request = await bloodRequestServices.createRequest(requestData, _id)

  response(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Your request posted successfully',
    data: request,
  })
})

const getAllRequests = catchAsync(async (req, res) => {
  const requests = await bloodRequestServices.getAllRequest()

  response(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All requests fetched successfully',
    data: requests,
  })
})

const myRequests = catchAsync(async (req, res) => {
  const id = req.user._id

  const requests = await bloodRequestServices.myRequests(id)
  response(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ypur requests fetched successfully',
    data: requests,
  })
})

const updateRequest = catchAsync(async (req, res) => {
  const requestId = req.params.requestId
  const userId = req.user._id
  const updateData = req.body
  const request = await bloodRequestServices.updateRequest(
    updateData,
    requestId,
    userId,
  )

  response(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your request updated successfully',
    data: request,
  })
})

const deleteRequest = catchAsync(async (req, res) => {
  const requestId = req.params.requestId
  const _id = req.user._id

  const deleteInfo = await bloodRequestServices.deleteRequest(_id, requestId)

  response(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Request deleted successfully',
    data: deleteInfo,
  })
})

const deleteRequestByAdmin = catchAsync(async (req, res) => {
  const id = req.params.requestId

  const deleteInfo = await bloodRequestServices.deleteRequestByAdmin(id)
  response(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Request deleted successfully',
    data: deleteInfo,
  })
})

export const bloodRequestControllers = {
  createRequest,
  getAllRequests,
  myRequests,
  updateRequest,
  deleteRequest,
  deleteRequestByAdmin,
}
