import { Donor } from '../donor/donor.model'
import { User } from './user.model'

const getAllDonors = async () => {
  const donors = await Donor.find({})

  return donors
}
const getSingleDonor = async (id: string) => {
  const donor = await Donor.findOne({ userId: id })
    .select('-__v -createdAt -updatedAt')
    .populate({
      path: 'userId',
      select: 'email',
    })

  return donor
}
const changeBlockState = async (id: string, isBlocked: boolean) => {
  const donor = await User.findByIdAndUpdate(id, { isBlocked: !isBlocked })

  return donor
}

export const userServices = {
  getAllDonors,
  getSingleDonor,
  changeBlockState,
}
