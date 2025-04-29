import Post from '../models/post.model.js'
import appError from '../libs/appError.js'

// Modelo CRUD
export const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({
            user: req.user.id // Solo trae los posts del usuario que los pidió
        }).populate('user')
        res.json(posts)
    } catch (error) {
        next(error)
    }
}

export const createPost = async (req, res, next) => {
    const { title, description, date } = req.body
    try {
        const newPost = new Post({
            title,
            description,
            user: req.user.id // Funciona gracias a que pasa por el authRequired y este guarda el user (req.user)
        })
        const postSaved = await newPost.save()
        res.json(postSaved)
    } catch (error) {
        next(error)
    }
}

export const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('user') // El populate es para que se guarde todos los datos del usuario, no solo su id
        if (!post) throw new appError("Post not found", 404)
        res.json(post)
    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id) // El req.params.id es el id que obtiene de /api/posts/:id
        if (!post) throw new appError("Post not found", 404)
        res.json(post)
    } catch (error) {
        next(error)
    }
}

export const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }) // El new:true se usa para devolver el dato ya actualizado
        if (!post) throw new appError("Post not found", 404)
        res.json(post)
    } catch (error) {
        next(error)
    }
}