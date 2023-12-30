import { Router } from 'express'
import { blogPostControllers } from './blogPost.controllers'

const router = Router()

router.post('/posts/create-post', blogPostControllers.createPost)
router.get('/posts', blogPostControllers.getAllPost)
router.get('/posts/:postId', blogPostControllers.getPostDetails)
router.get('/posts/my-posts', blogPostControllers.myPosts)
router.put('/posts/my-posts/:postId', blogPostControllers.updatePost)
router.delete('/posts/my-posts/:postId', blogPostControllers.deletePost)
router.delete('/posts/:postId', blogPostControllers.deletePost)
