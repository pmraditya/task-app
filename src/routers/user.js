const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../authentication/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeMessage, deleteMessage} = require('../email/account')
// router.get('/test',(req,res)=>{
//     res.send('this is me testing new things')
// })




router.get('/user/me', auth,async(req, res) => {

    res.send(req.user)

    // try{
    //     const user  = await User.find()
    //     res.send(user)
    // } catch(e){
    //     res.status(400).send(e)
    // }

    // User.find().then((result) => {
    //     res.status(201).send(result)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

const upload = multer({
   // dest:'avatars' ,// destination from where the programm is running
   //this multer will automatically update req object by req.file.buffer by this uploaded file
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('please upload jpg,jpeg,png format files'))
        }
        cb(undefined,true)
    }
    
})
router.post('/user/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({height:250 , width:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()

    res.send()
},(error,req,res,next)=>{
    res.status(400).send(error.message)
})

router.delete('/user/me/avatar',auth,async(req,res)=>{
    req.user.avatar = undefined
    req.user.save()
    res.send('successfully deleted')
})

router.get('/user/:id/avatar',async(req,res)=>{

    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
           return res.status(400).send('no image or user found')
        }

        res.set('Content-type','image/png')
        res.send(user.avatar)


    } catch (error) {
        res.send(error.message)
    }
    
    
})

router.post('/user', async(req, res) => {
    //res.send('testing!')
    // res.send(req.body)

    try{
        const user = new User(req.body)
        await user.save()
        sendWelcomeMessage(user.email,user.name)
        const token =await user.generateToken()

        res.status(201).send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }

    // const user = new User(req.body)
    // user.save().then(() => {
    //     res.send(user)
    // }).catch((error) => {
    //     res.status(400).send(error)
    //     //res.send(error)  upper written code is the shortcut

    // })
})

router.patch('/user/me',auth,async(req,res)=>{
    //const _id = req.params.id
    const allowedUpdates = ["name","email","password","age"]
    const givenUpdates = Object.keys(req.body)
    const check = givenUpdates.every((update)=>allowedUpdates.includes(update))
    if(!check)
    {
        res.status(500).send()
    }
    try{
        // Making save request instead of findByIdAndUpdate
        //const user =await User.findById(_id)
        givenUpdates.forEach((update)=>{
           req.user[update] = req.body[update]
        })
        await req.user.save()


        // const user = await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        if(!req.user){
           return res.status(404).send()
        }
        res.send(req.user)



    } catch(e){
        res.status(400).send(e.message)
    }
})

router.post('/user/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password) 
        const authToken = req.header('Authorization').replace('Bearer ','')
        if(authToken){
            const userToken = await user.tokens.filter((findToken)=> findToken.token === authToken)
            if(userToken.length > 0){
                return res.send({error:'user already loggin in',token:authToken})
            }
        }
        const token = await user.generateToken()
        // findByCredentials is the method defined by us
        //console.log(req.header('Authorization').replace('Bearer ',''))
        res.send({user: user,token}) //else we can use toJSON function
    }
    catch(e){
       // console.log(e)
        res.status(400).send(e.message)
        //You can log the errors with just that, but if you want to send the errors to the client, 
        //you must send e.message. The .send() method stringifies any objects you provided it and if you call
        // JSON.stringify() on an error object, you get an empty object:
        //console.log(JSON.stringify(new Error("Hello"))) // outputs {}
    }
})

router.post('/user/logout',auth,async(req,res)=>{
    try {
        
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token!== req.token
        })
        await req.user.save()
        res.send('successfully loged out')

    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.post('/user/logoutall',auth,async (req,res)=>{

    try {
       req.user.tokens = []
       await req.user.save()
   res.send('logged out successfully from all devices')

    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/user/me',auth,async(req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.params.id)
        // if(!user){
        //     res.status(404).send()
        // }

        await req.user.remove()
        deleteMessage(req.user.email,req.user.name)
        res.send(req.user)
    }
    catch(e){
        res.status(400).send()
    }
})



router.get('/user/:id', async(req, res) => {
    const _id = req.params.id

    try{
        const user = User.findById(_id)
        if(!user){
            return res.status(400).send()
        }
        res.send(user)
    }  catch(e){
        res.status(500).send()
    }

    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(400).send()
    //     }
    //     res.status(201).send(user)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

module.exports = router