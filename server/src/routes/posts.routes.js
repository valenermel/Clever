import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js'
import {getPost,getPosts,createPost,updatePost,deletePost} from '../controllers/post.controller.js'
import { createPostSchema } from '../schemas/posts.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'

const router = Router()

router.get('/post', authRequired, getPosts)

router.get('/post/:id', authRequired, getPost)

router.post('/post', validateSchema(createPostSchema) ,authRequired, createPost)

router.delete('/post/:id', authRequired, deletePost)

router.put('/post/:id', authRequired, updatePost)

export default router