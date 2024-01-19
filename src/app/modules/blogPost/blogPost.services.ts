import { Types } from 'mongoose'
import { TBlogPost } from './blogPost.interface'
import { BlogPost } from './blogPost.model'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'

const createBlog = async (blogData: TBlogPost, id: Types.ObjectId) => {
  blogData.createdBy = id

  const blog = await BlogPost.create(blogData)
  return blog
}

const getAllBlogs = async () => {
  const blogs = await BlogPost.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: 'donors',
        localField: 'createdBy',
        foreignField: 'userId',
        as: 'author',
      },
    },
    {
      $unwind: '$author', // Unwind the results to get a single embedded document
    },
  ])
  console.log(blogs)
  return blogs
}

const myBlogs = async (id: string) => {
  const myBlogs = await BlogPost.find({ createdBy: id })

  return myBlogs
}

const updateBlog = async (
  id: Types.ObjectId,
  blogId: string,
  updateData: Partial<TBlogPost>,
) => {
  const checkBlog = await BlogPost.findById(blogId)

  if (checkBlog?.createdBy !== id) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update!!',
    )
  }

  const blog = await BlogPost.findByIdAndUpdate(blogId, updateData, {
    new: true,
  })

  return blog
}

const deleteBlog = async (
  id: Types.ObjectId,

  blogId: string,
) => {
  const checkBlog = await BlogPost.findById(blogId)

  if (checkBlog?.createdBy !== id) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete!!',
    )
  }

  const deleteInfo = await BlogPost.deleteOne({ _id: blogId })

  return deleteInfo
}

const deleteBlogByAdmin = async (id: string) => {
  const deleteInfo = await BlogPost.deleteOne({ _id: id })

  return deleteInfo
}

export const blogPostServices = {
  createBlog,
  getAllBlogs,
  myBlogs,
  updateBlog,
  deleteBlog,
  deleteBlogByAdmin,
}
