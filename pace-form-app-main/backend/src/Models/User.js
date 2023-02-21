const mongoose = require('mongoose')
const { model, Schema } = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    rol: String
}, { timestamps: true })

userSchema.set('toJSON',({
    transform: (document, returnObjecto)=>{
        returnObjecto.id =returnObjecto._id
        delete returnObjecto._id
        delete returnObjecto.__v
        delete returnObjecto.password
    }
}))

const User = model('User', userSchema)
module.exports = User