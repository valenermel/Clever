import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js'
import appError from '../libs/appError.js'

export const register = async (req, res, next) => {
    const {username, email, password} = req.body
    try {

        const emailAlreadyExists = await User.findOne({email})
        if(emailAlreadyExists) throw appError(400, "Email already exists")

        const passwordHashed = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHashed,
        })
        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id })
        res.cookie('token', token)
        res.json({
            message: "User created successfully",
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const userFound = await User.findOne({email})
        if (!userFound) throw appError(400, "User not found")

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) throw appError(400, "Incorrect password")

        const token = await createAccessToken({ id: userFound._id })
        res.cookie('token', token)
        res.json({
            message: "User logged in successfully",
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res, next) => {
    try {
        res.cookie('token', "", {expires: new Date(0)})
        return res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

export const profile = async (req, res, next) => {
    try {
        const userFound = await User.findById(req.user.id)
        if (!userFound) throw appError(400, "User not found")

        const userObject = userFound.toObject()
        return res.json({
            id: userObject._id,
            username: userObject.username,
            email: userObject.email,
            createdAt: userObject.createdAt,
            updatedAt: userObject.updatedAt,
        })
    } catch (error) {
        next(error)
    }
}