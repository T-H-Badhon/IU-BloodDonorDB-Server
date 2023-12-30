import { catchAsync } from '../../utilitis/catchAsync'
import { userServices } from './user.services'

const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUser()
  console.log(result)
})
const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.userId
  const result = await userServices.getSingleUser(id)
  console.log(result)
})
const changeBlockState = catchAsync(async (req, res) => {
  const id = req.params.userId
  const result = await userServices.changeBlockState(id)
  console.log(result)
})

export const userControllers = {
  getAllUser,
  getSingleUser,
  changeBlockState,
}
