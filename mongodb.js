// CRUD opeartion on mongo db (create read update delete)

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ConnectionUrl = 'mongodb://127.0.0.1:27017'
const databasename = 'task-manager'
const objectId = mongodb.ObjectID
const id = new objectId();
console.log(id)
console.log(id.toHexString().length)

MongoClient.connect(ConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        return console.log('error ocurred while connection')
    }
    const db = client.db(databasename)
    // db.collection('users').findOne({_id :new objectId('5ef04cafd55a7128689f8c34') },(error,result)=>{ // you can use new objectId ('hexstring')
    //     if(error){
    //        return console.log('error while finding the content')
    //     }
    //         console.log(result)
    // })

    // db.collection('users').insertOne({
    //     name:'aditya kumar singh',
    //     description:'he is a good man'
    // })

    // db.collection('users').insertMany([{
    //     name : "pushkar",
    //     description:"pad man"
    // },{
    //     name:"ayush",
    //     description:"bad man"
    // }],(error,result)=>{
    //     if(error){
    //         return console.log('error ocurred while inserting')
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('tasks').insertMany([{
    //     completed : true,
    //     description:"pad man"
    // },{
    //     completed:false,
    //     description:"bad man"
    // },
    // {
    //     description:"it about me",
    //     completed:true
    // }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('error ocurred while inserting')
    //     }
    //     console.log(result.ops)
    // })
    //  db.collection('users').find({name:'aditya kumar singh'}).forEach((error,result)=>{//toArray can be used instead of forEach
    //      if(error){
    //          console.log(error)
    //      }
    //      else{
    //          console.log(result)
    //      }
    //  })//better one is forEach method


    // ############### update operation  #######################

    // ###############  by using promised ###########################

    // db.collection('users').updateOne({_id: objectId('5ef06c9cf1d79319e0254896')},
    // {
    //     $set:{
    //         name:'pushp'
    //     }
    // }
    // ).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // $$$$$$$$$$$$$$$$  by using callback $$$$$$$$$$$$$$$
    // db.collection('users').updateOne({_id: objectId('5ef06c9cf1d79319e0254897')},
    // {
    //     $set:{
    //         name:'Gupta'
    //     }
    // },
    // (error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result)
    // }

    // )

    // ################ using updateMany function ##########################

    // db.collection('tasks').updateMany({completed:true},
    //     {
    //         $set:{
    //             completed:false
    //         }
    //     }
    //     ).then((result)=>{
    //         console.log(result)
    //     }).catch((error)=>{
    //         console.log(error)
    //     })


    // ################## DELETE OPERATION ############################

    // db.collection('users').deleteOne({name:'Gupta'}).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })



})