import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    usename:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    }
})

export default mongoose.model('User',userSchema)