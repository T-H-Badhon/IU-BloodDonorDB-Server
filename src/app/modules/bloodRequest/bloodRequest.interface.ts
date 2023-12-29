import { Types } from 'mongoose'
import { TBloodGroup } from '../admin/admin.interface'

export type TBloodRequest = {
  bloodGroup: TBloodGroup
  location: string
  reason: string
  createdBy: Types.ObjectId
}
