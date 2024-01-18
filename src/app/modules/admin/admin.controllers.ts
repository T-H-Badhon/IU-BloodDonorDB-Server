import httpStatus from 'http-status'
import { catchAsync } from '../../utilitis/catchAsync'
import response from '../../utilitis/response'
import { adminServices } from './admin.services'

const profile = catchAsync(async (req, res) => {
  const id = req.user._id
  const result = await adminServices.profile(id)

  response(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrive successfully',
    data: result,
  })
})

const updateProfile = catchAsync(async (req, res) => {
  const { updateData } = req.body
  const id = req.user._id
  const result = await adminServices.updateProfile(updateData, id)

  response(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile Updated successfully',
    data: result,
  })
})

const deleteProfile = catchAsync(async (req, res) => {
  const id = req.user._id
  const result = await adminServices.deleteProfile(id)

  response(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile  deleted successfully!',
    data: result,
  })
})

export const adminControllers = {
  profile,
  updateProfile,
  deleteProfile,
}
