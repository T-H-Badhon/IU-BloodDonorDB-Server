import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { Admin } from './admin.model'
import { TAdmin } from './admin.interface'
import { User } from '../user/user.model'
import mongoose from 'mongoose'

const profile = async (id: string) => {
  const profile = await Admin.findOne({ userId: id }).populate({
    path: 'userId',
    select: 'email',
  })

  return profile
}

const updateProfile = async (updateData: Partial<TAdmin>, id: string) => {
  const updatedProfile = await Admin.findOneAndUpdate(
    { userId: id },
    updateData,
    {
      new: true,
    },
  ).populate({
    path: 'userId',
    select: 'email',
  })

  if (!updatedProfile?._id) {
    throw new AppError(httpStatus.BAD_REQUEST, ' Profile Update Failed!!')
  }

  return updatedProfile
}

const deleteProfile = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const user = await User.deleteOne({ _id: id }, { session })

    if (user.deletedCount != 1) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Profile delete Failed!!')
    }

    const donor = await Admin.deleteOne({ userId: id }, { session })
    if (donor.deletedCount != 1) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Profile delete Failed!!')
    }
    await session.commitTransaction()
    await session.endSession()

    return null
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Profile delete Failed!!')
  }
}

export const adminServices = {
  profile,
  updateProfile,
  deleteProfile,
}
