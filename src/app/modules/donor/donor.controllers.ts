import httpStatus from 'http-status'
import { catchAsync } from '../../utilitis/catchAsync'
import response from '../../utilitis/response'
import { donorServices } from './donor.services'

const getDonorListBySearch = catchAsync(async (req, res) => {
  const query = req.query

  const donors = await donorServices.getDonorListBySearch(query)

  response(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donor List Fetch Successfully!!',
    data: donors,
  })
})
const donorCount = catchAsync(async (req, res) => {
  const donors = await donorServices.donorCount()

  response(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donor number gets Successfully!!',
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
  const { updateData } = req.body

  const profile = await donorServices.updateProfile(id, updateData)

  response(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile  updated Successfully!!',
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
  getDonorListBySearch,
  donorCount,
  getDonorInfo,
  getProfile,
  updateProfile,
  deleteProfile,
}
