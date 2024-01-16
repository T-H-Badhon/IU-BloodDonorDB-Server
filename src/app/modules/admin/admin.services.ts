import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { User } from '../user/user.model'
import { Admin } from './admin.model'
import { TAdmin } from './admin.interface'

const profile = async (id: string) => {
  const user = await User.findById(id).select('email phone')

  const admin = await Admin.findOne({ userId: id })

  if (user && admin) {
    const profile = {
      name: admin.name,
      phone: user.phone,
      email: user.email,
      address: admin.address,
      area: admin.area,
      isDonor: admin.isDonor,
      isAvailable: admin.isAvailable,
    }

    return { profile }
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Profile retrieve Failed!!')
  }
}

const updateProfile = async (updateData: Partial<TAdmin>, id: string) => {
  const updatedProfile = await Admin.findByIdAndUpdate(id, updateData, {
    new: true,
  })

  if (!updatedProfile?._id) {
    throw new AppError(httpStatus.BAD_REQUEST, ' Profile Update Failed!!')
  }

  return { updatedProfile }
}

export const adminServices = {
  profile,
  updateProfile,
}
