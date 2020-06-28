const express  = require('express')
const Task = require('../model/task')
const router = new express.Router()
const auth = require('../authentication/auth')
//const app = express();


// GET /?completed=true
//GET /?createdAt:desc  for the ascending order

router.get('/task',auth,async(req,res)=>{
    const match = {}
    const sort = {}
    //sort.completed = 1
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const path = req.query.sortBy.split(':')
        sort[path[0]] = path[1] === 'desc' ? -1:1
    }

    try{
        // const task = await Task.find({owner:req.user._id})
        // res.send(task)
        
        await req.user.populate({
            path:'tasks',
            match, 
            limit:parseInt(req.query.limit), // if limit is not provided then mongoose will ignore this
            skip:parseInt(req.query.skip),
            options:{
                sort
            }
            
// ################# second method ###########################
            // options:{
            //     limit:parseInt(req.query.limit), // if limit is not provided then mongoose will ignore this
            // skip:parseInt(req.query.skip)
            // }
            

        }).execPopulate()
        res.send(req.user.tasks)
    }
    catch(e){
        res.status(400).send(e)
    }

    // Task.find().then((task)=>{
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status.send(error)
    // })
})
router.post('/task',auth, async(req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e){
        res.status(400).send()
    }


    // task.save().then(() => {
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })

})

router.get('/task/:id',auth,async(req,res)=>{
    const _id = req.params.id

    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id,owner:req.user._id})


        if(!task){
           return res.status(400).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(400).send(e)
    }

    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(400).send()
    //     }
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})
router.delete('/task/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const user = await Task.findOneAndDelete({_id,owner:req.user._id})
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(400).send()
    }
})

router.patch('/task/:id',auth,async(req,res)=>{
    const _id = req.params.id
    const allowedUpdates = ["description","completed"]
    const givenUpdates  = Object.keys(req.body)
    const isValid = givenUpdates.every((update)=>allowedUpdates.includes(update))
    if(!isValid){
         res.status(500).send()
    }
    try{
        // const task = await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        const task = await Task.findOne({_id,owner:req.user._id})
        

        if(!task){
           return  res.status(401).send()
        }

        givenUpdates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()       
        res.send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})

module.exports  = router