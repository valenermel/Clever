import mongoose from 'mongoose'

mongoose.Schema({
    usename:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
})