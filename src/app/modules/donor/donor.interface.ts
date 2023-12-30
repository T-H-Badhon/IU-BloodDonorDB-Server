import { Types } from 'mongoose'
import { TBloodGroup } from '../admin/admin.interface'

export type TDonor = {
  user: Types.ObjectId
  name: string
  age: number
  address: string
  bloodGroup: TBloodGroup
  isAvailable: boolean
}
