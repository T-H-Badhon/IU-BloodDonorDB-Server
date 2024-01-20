import mongoose, { Types } from 'mongoose'
import { TAdmin } from '../admin/admin.interface'
import { TPasswordHistory, TUser } from '../user/user.interface'
import { TLoginCredential } from './auth.interface'
import { User } from '../user/user.model'
import { TDonor } from '../donor/donor.interface'
import { Donor } from '../donor/donor.model'
import { Admin } from '../admin/admin.model'
import jwt from 'jsonwebtoken'
import { config } from '../../config/config'
import { hashedPassword } from '../../utilitis/hashedPassword'
import { matchPassword } from '../../utilitis/matchPassword'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'
import { isUsedBefore, timeFormater } from '../../utilitis/checkPasswordHistory'
import { sendMail } from '../../utilitis/SendMail'
import { randomPasswordGenerator } from '../../utilitis/randomPassword'

const registerAdmin = async (userData: TUser, adminData: TAdmin) => {
  userData.passwordChangeAT = new Date()
  userData.role = 'admin'
  userData.password = await hashedPassword(userData.password)

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Registration Failed!!')
    }

    adminData.userId = newUser[0]._id
    const newAdmin = await Admin.create([adminData], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Registration Failed!!')
    }
    await session.commitTransaction()
    await session.endSession()

    const tokenInfo = {
      _id: newUser[0]._id,
      email: newUser[0].email,
      role: newUser[0].role,
    }
    const token = jwt.sign(tokenInfo, config.ac_token as string, {
      expiresIn: '1h',
    })

    return {
      role: newUser[0].role,
      token,
    }
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Registration Failed!!')
  }
}
const registerDonor = async (userData: TUser, donorData: TDonor) => {
  userData.passwordChangeAT = new Date()
  userData.role = 'donor'
  userData.password = await hashedPassword(userData.password)

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Registration Failed!!')
    }

    donorData.userId = newUser[0]._id
    const newDonor = await Donor.create([donorData], { session })

    if (!newDonor.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Registration Failed!!')
    }
    await session.commitTransaction()
    await session.endSession()

    const tokenInfo = {
      _id: newUser[0]._id,
      email: newUser[0].email,
      role: newUser[0].role,
    }
    const token = jwt.sign(tokenInfo, config.ac_token as string, {
      expiresIn: '1h',
    })

    return {
      role: newUser[0].role,
      token,
    }
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw err
  }
}

const login = async (loginCredential: TLoginCredential) => {
  const { email, password } = loginCredential

  const loginUser = await User.findOne({ email }).select('+password')

  if (loginUser) {
    const isMatched = await matchPassword(password, loginUser.password)

    if (!isMatched) {
      throw new AppError(httpStatus.FORBIDDEN, 'password not matched')
    }

    if (loginUser.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are Blocked!')
    }

    const tokenInfo = {
      _id: loginUser._id,
      email: loginUser.email,
      role: loginUser.role,
    }
    const token = jwt.sign(tokenInfo, config.ac_token as string, {
      expiresIn: '1h',
    })

    return {
      role: loginUser.role,
      token,
    }
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found!!')
  }
}

const changePassword = async (
  currentPassword: string,
  newPassword: string,
  id: Types.ObjectId,
) => {
  const loginUser = await User.findById(id).select('+password')
  const isMatched = await matchPassword(
    currentPassword,
    loginUser?.password as string,
  )
  if (!isMatched) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Current Passwore doesn't match!",
    )
  }

  if (currentPassword === newPassword) {
    const formattedDate = timeFormater(loginUser?.passwordChangeAT as Date)
    return {
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formattedDate.date} at ${formattedDate.time}).`,
      data: null,
    }
  }

  const isUsed = await isUsedBefore(
    newPassword,
    loginUser?.passwordHistory as TPasswordHistory[],
  )

  if (isUsed) {
    return {
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not among the last 2 used ${isUsed}.`,
      data: null,
    }
  }

  const newPassHistory: TPasswordHistory = {
    password: loginUser?.password as string,
    usedAt: new Date(),
  }

  loginUser?.passwordHistory?.unshift(newPassHistory)

  if (loginUser?.passwordHistory && loginUser.passwordHistory.length > 2) {
    loginUser.passwordHistory.pop()
  }

  const newHashedPassword = await hashedPassword(newPassword)
  const user = await User.findByIdAndUpdate(
    id,
    {
      password: newHashedPassword,
      passwordChangeAT: new Date(),
      passwordHistory: loginUser?.passwordHistory,
    },
    { new: true },
  ).select('_id username email role createdAt updatedAt')

  if (user) {
    const tokenInfo = {
      _id: user._id,
      email: user.email,
      role: user.role,
    }
    const token = jwt.sign(tokenInfo, config.ac_token as string, {
      expiresIn: '1h',
    })

    return {
      success: true,
      statusCode: 200,
      message: 'Password Changed SuccessFully',
      data: {
        role: user.role,
        token,
      },
    }
  }
  throw new AppError(httpStatus.BAD_REQUEST, 'Password Change Failed')
}
const forgetPassword = async (email: string) => {
  const checkUser = await User.findOne({ email: email })

  if (!checkUser?._id) {
    throw new AppError(httpStatus.NOT_FOUND, "Email doesn't exsist!")
  }

  const newPassword = randomPasswordGenerator(8)
  const newHashedPassword = await hashedPassword(newPassword)

  const user = await User.findByIdAndUpdate(
    checkUser._id,
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
    { new: true },
  ).select('_id username email role createdAt updatedAt')

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password Recovery Failed')
  }

  const resetInfo = {
    email,
    newPassword,
  }

  const result = await sendMail(resetInfo)

  return result
}

export const authServices = {
  registerAdmin,
  registerDonor,
  login,
  changePassword,
  forgetPassword,
}
