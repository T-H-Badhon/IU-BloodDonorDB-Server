import mongoose from 'mongoose'
import { TDonor } from './donor.interface'
import { Donor } from './donor.model'
import { User } from '../user/user.model'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'

const getDonorListByBloodGroup = async (bloodGroup: string) => {
  const result = await Donor.find({ bloodGroup: bloodGroup }).select(
    '_id name phone address bloodGroup isAvailable',
  )

  return result
}

const getDonorInfo = async (id: string) => {
  const donor = await Donor.findById(id)
    .select('name phone address area bloodGroup isAvailable lastDonateDate')
    .populate({
      path: 'userId',
      select: 'email',
    })

  return donor
}

const getProfile = async (id: string) => {
  const profile = await Donor.findOne({ userId: id })
    .select('-__v -createdAt -updatedAt ')
    .populate({
      path: 'userId',
      select: 'email',
    })

  return profile
}
const updateProfile = async (id: string, updateData: Partial<TDonor>) => {
  const updatedProfile = await Donor.findOneAndUpdate(
    { userId: id },
    updateData,
    { new: true },
  )

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

    const donor = await Donor.deleteOne({ userId: id }, { session })
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

export const donorServices = {
  getDonorListByBloodGroup,
  getDonorInfo,
  getProfile,
  updateProfile,
  deleteProfile,
}
