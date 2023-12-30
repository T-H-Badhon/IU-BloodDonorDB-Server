import { catchAsync } from '../../utilitis/catchAsync'
import { blogPostServices } from './blogPost.services'

const createPost = catchAsync(async (req, res) => {
  const { postData } = req.body
  const result = await blogPostServices.createPost(postData)
  console.log(result)
})

const getAllPost = catchAsync(async (req, res) => {
  const result = await blogPostServices.getAllPost()
  console.log(result)
})

const getPostDetails = catchAsync(async (req, res) => {
  const id = req.params.postId
  const result = await blogPostServices.getPostDetails(id)
  console.log(result)
})

const myPosts = catchAsync(async (req, res) => {
  const id = req.user._id
  const result = await blogPostServices.myPosts(id)
  console.log(result)
})

const updatePost = catchAsync(async (req, res) => {
  const id = req.user._id
  const { updateData } = req.body
  const result = await blogPostServices.updatePost(id, updateData)
  console.log(result)
})

const deletePost = catchAsync(async (req, res) => {
  const id = req.params.postId
  const result = await blogPostServices.deletePost(id)

  console.log(result)
})

export const blogPostControllers = {
  createPost,
  getAllPost,
  getPostDetails,
  myPosts,
  updatePost,
  deletePost,
}
