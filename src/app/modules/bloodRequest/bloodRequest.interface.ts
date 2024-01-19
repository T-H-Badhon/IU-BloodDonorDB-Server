import { Types } from 'mongoose'
import { TBloodGroup } from '../admin/admin.interface'

export type TBloodRequest = {
  bloodGroup: TBloodGroup
  patientName: string
  phone: string
  date: Date
  area: string
  reason: string
  createdBy: Types.ObjectId
}
