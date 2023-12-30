import { catchAsync } from '../../utilitis/catchAsync'
import { adminServices } from './admin.services'

const profile = catchAsync(async (req, res) => {
  const id = req.user._id
  const result = await adminServices.profile(id)

  console.log(result)
})

const updateProfile = catchAsync(async (req, res) => {
  const { updateData } = req.body
  const id = req.user._id
  const result = await adminServices.updateProfile()

  console.log(result)
})

export const adminControllers = {
  profile,
  updateProfile,
}
