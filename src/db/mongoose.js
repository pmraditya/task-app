const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
})



// const me = new User({
//     name:'aditya kumar singh',
//     age:57,
//     email:'aditya@h.com',
//     password:'fdpassword123'  //erro because password contain password
// })

// me.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

// 
// const myTask = new Task({
//     description: 'this is my second task',
//     // completed :true
// })

// myTask.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })