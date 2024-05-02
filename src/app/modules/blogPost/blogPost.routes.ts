import { Router } from 'express'
import { blogPostControllers } from './blogPost.controllers'
import auth from '../../middleware/Auth'

const router = Router()

router.post('/create-blog', auth('donor'), blogPostControllers.createBlog)
router.get(
  '/',
  auth('admin', 'donor', 'super-admin'),
  blogPostControllers.getAllBlogs,
)
router.get('/my-blogs', auth('donor'), blogPostControllers.myBlogs)
router.put('/my-blogs/:blogId', auth('donor'), blogPostControllers.updateBlog)
router.delete(
  '/my-blogs/:blogId',
  auth('donor'),
  blogPostControllers.deleteBlog,
)
router.delete(
  '/:blogId',
  auth('admin', 'super-admin'),
  blogPostControllers.deleteBlogByAdmin,
)

export const blogPostRoutes = router
