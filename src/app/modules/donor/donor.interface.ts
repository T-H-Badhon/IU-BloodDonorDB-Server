import { Types } from 'mongoose'
import { TBloodGroup } from '../admin/admin.interface'

export type TDonor = {
  userId: Types.ObjectId
  name: string
  address: string
  bloodGroup: TBloodGroup
  area: string
  isAvailable: boolean
}
