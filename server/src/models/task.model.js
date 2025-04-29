import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now,
        },
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

export default mongoose.model('Task',taskSchema)