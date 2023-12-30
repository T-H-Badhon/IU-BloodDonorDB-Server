import { Types } from 'mongoose'
import { TAdmin } from '../admin/admin.interface'
import { TUser } from '../user/user.interface'
import { TChangePasswordCredential, TLoginCredential } from './auth.interface'

const registerAdmin = async (userData: Partial<TUser>, adminData: TAdmin) => {
  console.log(userData, adminData)
}
const registerDonor = async (userData: Partial<TUser>, donorData: TAdmin) => {
  console.log(userData, donorData)
}

const login = async (loginCredential: TLoginCredential) => {
  console.log(loginCredential)
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
