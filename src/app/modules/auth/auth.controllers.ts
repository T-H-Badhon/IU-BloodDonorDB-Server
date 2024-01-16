import { catchAsync } from '../../utilitis/catchAsync'
import { authServices } from './auth.services'

const registerAdmin = catchAsync(async (req, res) => {
  const { userData, adminData } = req.body
  console.log(req.headers)
  const result = await authServices.registerAdmin(userData, adminData)

  res.status(result?.statusCode as number).json({
    success: result?.success,
    statusCode: result?.statusCode,
    message: result?.message,
  })
})
const registerDonor = catchAsync(async (req, res) => {
  const { userData, donorData } = req.body

  const result = await authServices.registerDonor(userData, donorData)

  res.status(result?.statusCode as number).json({
    success: result?.success,
    statusCode: result?.statusCode,
    message: result?.message,
  })
})

const login = catchAsync(async (req, res) => {
  const { loginCredential } = req.body
  console.log(loginCredential)
  const result = await authServices.login(loginCredential)

  res.json({
    result,
  })
})

const changePassword = catchAsync(async (req, res) => {
  const { changePasswordCredential } = req.body

  console.log(req.headers)
  console.log(req.body)

  const result = await authServices.changePassword(changePasswordCredential)

  // console.log(result)
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
