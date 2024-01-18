import { Schema, model } from 'mongoose'
import { TBlogPost } from './blogPost.interface'

const blogPostSchema = new Schema<TBlogPost>(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'donor',
    },
  },
  {
    timestamps: true,
  },
)

export const BlogPost = model<TBlogPost>('blogPost', blogPostSchema)
