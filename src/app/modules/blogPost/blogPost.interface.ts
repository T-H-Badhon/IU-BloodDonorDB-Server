import { Types } from 'mongoose'

export type TBlogPost = {
  title: string
  details: string
  createdBy: Types.ObjectId
}
