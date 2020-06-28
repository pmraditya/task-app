const jwt = require('jsonwebtoken')
const User = require('../model/user')


const auth = async (req,res,next)=>{
   // console.log('i am the don')


//    console.log(req.header('Authorization'))

try {
    
    const token = req.header('Authorization').replace('Bearer ','')
    // console.log(token)
    const isValid = await jwt.verify(token,process.env.SECRET)
    const user = await User.findOne({'_id':isValid._id, 'tokens.token':token})

    if(!user){
        throw new Error()
    }
    req.token = token
    req.user = user
    next()

} catch (error) {
    res.status(400).send({error:'something get wrong'})
}


}

module.exports = auth