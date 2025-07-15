import Post from '../models/post.model.js'
import appError from '../libs/appError.js'

// Modelo CRUD
export const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({}) // Trae todos los posts
            .populate('user')
        res.json(posts)
    } catch (error) {
        next(error)
    }
}

export const createPost = async (req, res, next) => {
    const { title, description } = req.body
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
        const post = await Post.findById(req.params.id)
        if (!post) throw new appError("Post not found", 404)
        if (post.user.toString() !== req.user.id) throw new appError("No autorizado", 403)
        await post.deleteOne()
        res.json({ message: "Post eliminado" })
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

export const votePost = async (req, res, next) => {
    try {
        const { type } = req.body // 'up' o 'down'
        const post = await Post.findById(req.params.id)
        if (!post) throw new appError("Post not found", 404)
        const existingVote = post.votedBy.find(v => v.user.toString() === req.user.id)
        if (existingVote) {
            // Si el voto es igual, no hacer nada
            if (existingVote.type === type) {
                throw new appError("Ya votaste este post", 400)
            }
            // Cambiar el voto
            if (existingVote.type === 'up') post.votos_positivos -= 1
            if (existingVote.type === 'down') post.votos_negativos -= 1
            if (type === 'up') post.votos_positivos += 1
            if (type === 'down') post.votos_negativos += 1
            existingVote.type = type
        } else {
            if (type === 'up') post.votos_positivos += 1
            else if (type === 'down') post.votos_negativos += 1
            else throw new appError("Tipo de voto inválido", 400)
            post.votedBy.push({ user: req.user.id, type })
        }
        await post.save()
        res.json(post)
    } catch (error) {
        next(error)
    }
}