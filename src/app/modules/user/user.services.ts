import { Donor } from '../donor/donor.model'
import { User } from './user.model'

const getAllDonors = async (query: Record<string, unknown>) => {
  let searchTerm = ''

  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string
  }

  const donors = await Donor.find({
    $or: ['email', 'phone', 'name'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  }).populate({
    path: 'userId',
    select: 'email role isBlocked',
  })
  return donors
}

const changeBlockState = async (id: string, isBlocked: boolean) => {
  const donor = await User.findByIdAndUpdate(
    { _id: id },
    { isBlocked: isBlocked },
    { new: true },
  ).select('isBlocked')

  return donor
}

export const userServices = {
  getAllDonors,
  changeBlockState,
}
