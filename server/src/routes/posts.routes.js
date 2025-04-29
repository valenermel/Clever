import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js'
import {getPost,getPosts,createPost,updatePost,deletePost} from '../controllers/post.controller.js'
import { createPostSchema } from '../schemas/posts.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'

const router = Router()

router.get('/posts', authRequired, getPosts)

router.get('/posts/:id', authRequired, getPost)

router.post('/posts', validateSchema(createPostSchema) ,authRequired, createPost)

router.delete('/posts/:id', authRequired, deletePost)

router.put('/posts/:id', authRequired, updatePost)

export default router