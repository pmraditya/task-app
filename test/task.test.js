const app = require('../src/app')
const request = require('supertest')
const User = require('../src/model/user')
const Task = require('../src/model/task')
const { 
    userId,
    userOne,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    updateDatabase
} = require('./db/db')

beforeEach(updateDatabase)

test('creating a new task',async()=>{
   const response =  await request(app)
        .post('/task')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            description:'this is the test case task'
        })
        .expect(201)
        const task = await Task.findById(response.body._id)
        expect(task).not.toBeNull()
})

//validating a task by unauthorized credentials

test('deleting task of one by second user',async()=>{
    await request(app)
        .delete(`/task/${taskOne._id}`)
        .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()    

})