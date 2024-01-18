import httpStatus from 'http-status'
import { catchAsync } from '../../utilitis/catchAsync'
import response from '../../utilitis/response'
import { donorServices } from './donor.services'

const getDonorListByBloodGroup = catchAsync(async (req, res) => {
  const bloodGroup = req.params.bloodGroup
  const donors = await donorServices.getDonorListByBloodGroup(bloodGroup)

  response(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donor List Fetch Successfully!!',
    data: donors,
  })
})
const getDonorInfo = catchAsync(async (req, res) => {
  const id = req.params.donorId
  const donor = await donorServices.getDonorInfo(id)

  response(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donor  Fetch Successfully!!',
    data: donor,
  })
})
const getProfile = catchAsync(async (req, res) => {
  const id = req.user._id
  const profile = await donorServices.getProfile(id)

  response(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile  Fetch Successfully!!',
    data: profile,
  })
})
const updateProfile = catchAsync(async (req, res) => {
  const id = req.user._id
  const updateData = req.body
  const profile = await donorServices.updateProfile(id, updateData)

  response(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile  Fetch Successfully!!',
    data: profile,
  })
})
const deleteProfile = catchAsync(async (req, res) => {
  const id = req.user._id
  const result = await donorServices.deleteProfile(id)

  response(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile  deleted successfully!',
    data: result,
  })
})

export const donorControllers = {
  getDonorListByBloodGroup,
  getDonorInfo,
  getProfile,
  updateProfile,
  deleteProfile,
}
