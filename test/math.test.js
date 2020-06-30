const {checkSum,celciusToFahrenheit,fahrenheitToCelcius,add} = require('../src/checking')

test('process test file',()=>{
    const test = checkSum(3,5)
    expect(test).toBe(8)

    // if(test !==8){
    //     throw new Error(`value should be 8 found value is ${test}`)
    // }

})

// test('checking degree value from celcius to fahrenheit',()=>{
//     const test = celciusToFahrenheit(0)
//     expect(test).toBe(32)
// })

// test('checking the value from fahrenheit to celcius',()=>{
//     const test = fahrenheitToCelcius(32)
//     expect(test).toBe(0)
// })
// // test('Async test demo',(done)=>{
// //     setTimeout(()=>{
// //         expect(1).toBe(2)
// //         done()
// //     },2000)
// // })

// test('promise checking',(done)=>{
//     add(3,5).then((sum)=>{
//         expect(sum).toBe(8)
//         done()
//     })
// })

// test('async and await',async()=>{
//     const sum = await add(3,5)
//     expect(sum).toBe(8)
// })
