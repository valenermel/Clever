import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },

        votos_negativos:{
            type: Number,
            default: 0
        },

        votos_positivos:{
            type: Number,
            default: 0
        },

        votedBy: [{
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          type: { type: String, enum: ['up', 'down'] }
        }],

        user:{ //esto es para guardar de que usuario es esa tarea
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Post',postSchema)