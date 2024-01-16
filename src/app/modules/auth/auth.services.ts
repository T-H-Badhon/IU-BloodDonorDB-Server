import mongoose, { Types } from 'mongoose'
import { TAdmin } from '../admin/admin.interface'
import { TUser } from '../user/user.interface'
import { TChangePasswordCredential, TLoginCredential } from './auth.interface'
import { User } from '../user/user.model'
import { TDonor } from '../donor/donor.interface'
import { Donor } from '../donor/donor.model'
import { Admin } from '../admin/admin.model'
import jwt from 'jsonwebtoken'
import { config } from '../../config/config'

const registerAdmin = async (userData: Partial<TUser>, adminData: TAdmin) => {
  userData.passwordChangeAT = new Date()
  userData.role = 'admin'

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new Error('user not created')
    }
    console.log(newUser)
    adminData.userId = newUser[0]._id
    const newAdmin = await Admin.create([adminData], { session })
    console.log(newAdmin[0])
    if (!newAdmin.length) {
      throw new Error('Course rivew failed!')
    }
    await session.commitTransaction()
    await session.endSession()

    return {
      success: true,
      statusCode: 200,
      message: 'Registration Complete!',
    }
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    console.log(err)
  }
}
const registerDonor = async (userData: Partial<TUser>, donorData: TDonor) => {
  userData.passwordChangeAT = new Date()
  userData.role = 'donor'

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new Error('user not created')
    }
    console.log(newUser)
    donorData.userId = newUser[0]._id
    const newDonor = await Donor.create([donorData], { session })
    console.log(newDonor[0])
    if (!newDonor.length) {
      throw new Error('Course rivew failed!')
    }
    await session.commitTransaction()
    await session.endSession()

    return {
      success: true,
      statusCode: 200,
      message: 'Registration Complete!',
    }
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    console.log(err)
  }
}

const login = async (loginCredential: TLoginCredential) => {
  const { email, password } = loginCredential

  const loginUser = await User.findOne({ email }).select('+password')

  if (loginUser) {
    // const isMatched = await matchPassword(password, loginUser.password)

    // if (!isMatched) {
    //   throw new AppError(httpStatus.FORBIDDEN, 'password not matched')
    // }

    if (loginUser.password !== password) {
      return {
        success: false,
        message: 'Wrong Password',
        statusCode: 404,
      }
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
    throw new Error('user not found')
  }
}

const changePassword = async (
  changePasswordCredential: TChangePasswordCredential,
) => {
  console.log(changePasswordCredential)
}
const forgetPassword = async (id: Types.ObjectId, password: string) => {
  console.log(id, password)
}

export const authServices = {
  registerAdmin,
  registerDonor,
  login,
  changePassword,
  forgetPassword,
}
