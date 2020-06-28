const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})
// taskSchema.pre('save',async function(next){
//     console.log('task is being saved and you can check it here and you can modify it here')
// })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task