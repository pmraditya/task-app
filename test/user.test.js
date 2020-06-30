const app = require('../src/app')
const request = require('supertest')
const User = require('../src/model/user')
const { 
    userId,
    userOne,
    updateDatabase
} = require('./db/db')

beforeEach(updateDatabase)

 
test('testing creating a user',async()=>{
   const response = await request(app).post('/user').send({
        name:'aditya kumar singh',
        email:'iamalsoadon@kdfjlk.con',
        password:'iamdonand'
    }).expect(201)

    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    //asserting about the response
    expect(response.body).toMatchObject({
        user:{
            name:'aditya kumar singh',
            email:'iamalsoadon@kdfjlk.con'
        },
        token:user.tokens[0].token
})
})

test('logging in the existing user',async()=>{
    
    
    const response = await request(app).post('/user/login').send({
        email:userOne.email,
        password:userOne.password
    })
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .expect(200)
    const user = await User.findById(userOne._id)
    expect(response.body).toMatchObject({
        error:'user already loggin in',
        token:user.tokens[0].token
    })
})

test('logging in the non-existing user',async()=>{
    await request(app).post('/user/login').send({
        email:'lksdfjklfjkd@dlfdlkj.cldj',
        password:'sldkfjldskjfdsf'
    }).expect(400)
})

test('finding for profile',async()=>{
    await request(app)
            .get('/user/me')
            .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
})

test('not finding the user',async()=>{
    await request(app)
        .get('/user/me')
        .send()
        .expect(401)
})

test('deleting user',async()=>{
    const response = await request(app)
        .delete('/user/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        const user = await User.findById(response.body.user._id)
        expect(user).toBeNull()
})
test('not deleting the user',async()=>{
    await request(app)
        .delete('/user/me')
        .send()
        .expect(401)
})

test('testing a avatar',async()=>{
    await request(app)
        .post('/user/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','test/fixtures/profile-pic.jpg')
        .expect(200)

        const user = await User.findById(userOne._id)
        expect(user.avatar).toEqual(expect.any(Buffer))
})

test('updating the user',async()=>{
    await request(app)
        .patch('/user/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name:'krishna'
        })
        .expect(200)

        //checking the name has been updated or not
        const user = await User.findById(userOne._id)
        expect(user.name).toBe('krishna')
})

test('not updating the user',async()=>{
    await request(app)
        .patch('/user/me')
        .send({
            name:'krishna'
        })
        .expect(401)
})

test('updating something else that does not exist in user',async()=>{
    await request(app)
        .patch('/user/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            location:'patna'
        })
        .expect(500)
})























//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks