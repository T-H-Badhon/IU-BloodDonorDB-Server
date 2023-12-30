import { TBlogPost } from './blogPost.interface'

const createPost = async (postData: TBlogPost) => {
  console.log(postData)
}

const getAllPost = async () => {
  console.log('all Posts')
}

const getPostDetails = async (id: string) => {
  console.log(id)
}

const myPosts = async (id: string) => {
  console.log(id)
}

const updatePost = async (id: string) => {
  console.log(id)
}

const deletePost = async (id: string) => {
  console.log(id)
}

export const blogPostServices = {
  createPost,
  getAllPost,
  getPostDetails,
  myPosts,
  updatePost,
  deletePost,
}
