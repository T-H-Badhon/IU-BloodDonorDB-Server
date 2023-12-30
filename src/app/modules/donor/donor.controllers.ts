import { catchAsync } from '../../utilitis/catchAsync'
import { donorServices } from './donor.services'

const getDonorListByBloodGroup = catchAsync(async (req, res) => {
  const bloodGroup = req.params.bloodGroup
  const result = await donorServices.getDonorListByBloodGroup(bloodGroup)

  console.log(result)
})
const getDonorInfo = catchAsync(async (req, res) => {
  const id = req.params.donorId
  const result = await donorServices.getDonorInfo(id)

  console.log(result)
})
const getProfile = catchAsync(async (req, res) => {
  const id = req.params.donorId
  const result = await donorServices.getProfile(id)

  console.log(result)
})
const updateProfile = catchAsync(async (req, res) => {
  const id = req.params.donorId
  const result = await donorServices.updateProfile(id)

  console.log(result)
})
const deleteProfile = catchAsync(async (req, res) => {
  const id = req.params.donorId
  const result = await donorServices.deleteProfile(id)

  console.log(result)
})

export const donorControllers = {
  getDonorListByBloodGroup,
  getDonorInfo,
  getProfile,
  updateProfile,
  deleteProfile,
}
