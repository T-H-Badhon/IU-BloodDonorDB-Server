import { Types } from 'mongoose'

export type TBloodGroup =
  | 'A+'
  | 'B+'
  | 'AB+'
  | 'O+'
  | 'A+'
  | 'B+'
  | 'AB+'
  | 'O+'

export type TAdmin = {
  userId: Types.ObjectId
  name: string
  phone: string
  address: string
  workingArea: string
  bloodGroup: TBloodGroup
  isAvailable: boolean
}
