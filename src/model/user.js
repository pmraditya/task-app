const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../model/task')
//By user Schema property of mongoose , we are able to use some of the middleware property of mongoose 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //trim is going to trim only initial and after words spaces 
    },
    age: {
        type: "number" // or Number you can use
    },
    email: {
        type: String,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('enter correct email address')
            }
        },
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) { //any name we can use for the function name
            if (value.toLowerCase().includes('password')) {
                throw new Error('password cannot be taken as password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar:{
        type:Buffer
    }

},{
    timestamps:true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateToken = async function () {
    const user = this
    const token = await jwt.sign({
        _id: user._id.toString()
    }, process.env.SECRET)
    user.tokens = user.tokens.concat({
        token
    })
    await user.save()
    //console.log(user._id.toString())
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    })
    if (!user) {
        throw new Error('no user found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('password did not match')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (await user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        // console.log(await bcrypt.hash('new user is saving',8))
    }
    next()
})

userSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('User', userSchema)



module.exports = User