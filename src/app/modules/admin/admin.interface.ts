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
  age: number
  address: string
  area: string
  bloodGroup: TBloodGroup
  isDonor: boolean
}
