const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express();
//############################## DEFINING MIDDLEWARE FUNCTION  #####################################################
// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send('get request temporarily unavailable')
//     }
//     else{
//         next()
//     }
// })

const multer = require('multer')
const upload = multer({
    dest:'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){ //file.originalname.endsWith('.doc')
            cb(new Error('please upload word files'))
        }
        cb(undefined,true)
    }
})
const middlewaref = (req,res,next)=>{
    throw new Error('always throw error')
    next()
}

app.post('/upload',upload.single('upload'),async(req,res)=>{
    res.status(400).send()
},(error,req,res,next)=>{
    res.status(400).send(error.message)
})

// app.use((req,res,next)=>{
//     res.status(503).send('server is closed temporarily')
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT
 //It will parse incoming JSON to object automatically
 



// ######################## DEFINING THE ROUTER ########################################//

// const router = new express.Router()
// router.get('/test',(req,res)=>{
//     res.send('this is me testing the new things')
// })
// app.use(router)
// #################### Important note ###########################################//
// express does not use return from the function hence, by adding only async to a function does not affect anything because express is
// only using req and res for sending and receiving any data from user side ........

// const bcrypt = require('bcryptjs')
// const myFunction = async()=>{
//     const password = 'Red1234!'
//     const hashedPassword  = await bcrypt.hash(password,8)
//     console.log(hashedPassword)
//     const isValid = await bcrypt.compare(password,hashedPassword)
//     console.log(isValid)
    
// }
// myFunction()

//################################# generating  json web token ##############################################
//  const jwt = require('jsonwebtoken')

//  const myFunction = async ()=>{
//      const token =  jwt.sign({_id:'iamdon'},'secretissecret',{expiresIn:'7 days'})
//      console.log(token)
//      const verifyToken = jwt.verify(token,'secretissecret')
//      console.log(verifyToken)
//  }
//  myFunction()











app.listen(port, () => {
    console.log('server is running on port', port)
})

// const Task = require('./model/task')

// const main = async()=>{
//     const task = await Task.findById('5ef580bf0b0a5337045b0f56')
//     console.log(task.owner)
//     await task.populate('owner').execPopulate()
//     console.log(task)
// }
// main()

// const User = require('./model/user')
// const main = async ()=>{
//  const user = await User.findById('5ef4da58820df85504189f1c')
//  await user.populate('tasks').execPopulate()
//  console.log(user.tasks)
// }
//  main()