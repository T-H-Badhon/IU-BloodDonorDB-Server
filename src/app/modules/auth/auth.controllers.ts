import { catchAsync } from '../../utilitis/catchAsync'
import response from '../../utilitis/response'
import { authServices } from './auth.services'

const registerAdmin = catchAsync(async (req, res) => {
  const { userData, adminData } = req.body
  const result = await authServices.registerAdmin(userData, adminData)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Registered Successfull!!',
    data: result,
  })
})
const registerDonor = catchAsync(async (req, res) => {
  const { userData, donorData } = req.body

  const result = await authServices.registerDonor(userData, donorData)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Registered Successfull!!',
    data: result,
  })
})

const login = catchAsync(async (req, res) => {
  const { loginCredential } = req.body

  const result = await authServices.login(loginCredential)

  response(res, {
    success: true,
    statusCode: 200,
    message: 'Login successfully',
    data: result,
  })
})

const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body.changePasswordCredential

  const id = req.user._id

  const result = await authServices.changePassword(
    currentPassword,
    newPassword,
    id,
  )

  response(res, result)
})
const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body
  const auth = req.user

  const result = await authServices.forgetPassword(email, auth.email, auth._id)

  response(res, {
    success: true,
    statusCode: 200,
    message: 'Reset link send to email',
    data: result,
  })
})

export const authControllers = {
  registerAdmin,
  registerDonor,
  login,
  changePassword,
  forgetPassword,
}
