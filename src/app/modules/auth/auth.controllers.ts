import { catchAsync } from '../../utilitis/catchAsync'
import { authServices } from './auth.services'

const registerAdmin = catchAsync(async (req, res) => {
  const { userData, adminData } = req.body

  const result = await authServices.registerAdmin(userData, adminData)

  console.log(result)
})
const registerDonor = catchAsync(async (req, res) => {
  const { userData, donorData } = req.body

  const result = await authServices.registerDonor(userData, donorData)

  console.log(result)
})

const login = catchAsync(async (req, res) => {
  const { loginCredential } = req.body

  const result = await authServices.login(loginCredential)

  console.log(result)
})

const changePassword = catchAsync(async (req, res) => {
  const { changePasswordCredential } = req.body

  const result = await authServices.login(changePasswordCredential)

  console.log(result)
})
const forgetPassword = catchAsync(async (req, res) => {
  const { password } = req.body
  const id = req.user._id

  const result = await authServices.forgetPassword(id, password)

  console.log(result)
})

export const authControllers = {
  registerAdmin,
  registerDonor,
  login,
  changePassword,
  forgetPassword,
}
