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
  user: Types.ObjectId
  name: string
  age: number
  address: string
  bloodGroup: TBloodGroup
  isDonor: boolean
}
