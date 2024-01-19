import httpStatus from 'http-status'
import { catchAsync } from '../../utilitis/catchAsync'
import response from '../../utilitis/response'
import { blogPostServices } from './blogPost.services'

const createBlog = catchAsync(async (req, res) => {
  const { blogData } = req.body
  const { _id } = req.user
  console.log(req.user)
  const blog = await blogPostServices.createBlog(blogData, _id)
  response(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog posted successfully',
    data: blog,
  })
})

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogPostServices.getAllBlogs()
  response(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All blogs fetched successfully',
    data: result,
  })
})

const myBlogs = catchAsync(async (req, res) => {
  const { _id } = req.user
  const blogs = await blogPostServices.myBlogs(_id)
  response(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your Blogs fetched successfully',
    data: blogs,
  })
})

const updateBlog = catchAsync(async (req, res) => {
  const modifierUserId = req.user._id
  const blogId = req.params.blogId
  const { updateData } = req.body
  const blog = await blogPostServices.updateBlog(
    modifierUserId,
    blogId,
    updateData,
  )
  response(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: blog,
  })
})

const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.blogId
  const _id = req.user._id

  const deleteInfo = await blogPostServices.deleteBlog(_id, blogId)

  response(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: deleteInfo,
  })
})

const deleteBlogByAdmin = catchAsync(async (req, res) => {
  const id = req.params.blogId

  const deleteInfo = await blogPostServices.deleteBlogByAdmin(id)
  response(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: deleteInfo,
  })
})

export const blogPostControllers = {
  createBlog,
  getAllBlogs,
  myBlogs,
  updateBlog,
  deleteBlog,
  deleteBlogByAdmin,
}
