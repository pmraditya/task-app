const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/model/user')
const Task = require('../../src/model/task')


const userId = new mongoose.Types.ObjectId()
const userOne = {
    _id:userId,
    name:'mike',
    email:'mikeisnotdon@dkfj.con',
    password:'iamdonand',
    tokens:[
        {
            token:jwt.sign({_id:userId},process.env.SECRET)
        }
    ]
}
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name:'aditya',
    email:'aditya@gmail.con',
    password:'iamalsodon',
    tokens:[
        {
            token: jwt.sign({_id:userTwoId},process.env.SECRET)
        }
    ]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description:'first',
    completed:true,
    owner:userOne._id
}
const taskTwo  = {
     _id: new mongoose.Types.ObjectId(),
    description:'second',
    completed:false,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'third',
    completed:true,
    owner:userTwo._id
}

const updateDatabase = async ()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskThree).save()
    await new Task(taskTwo).save()
}

module.exports = {
    userId,
    userOne,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    updateDatabase
}