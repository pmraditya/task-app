const checkSum = (a,b)=> a+b


const add  = (a,b)=>{
   
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{

            if(a< 0 || b < 0){
                return reject('number must be positive')
            }
        resolve(a+b)
    },2000)
})
}

const celciusToFahrenheit = (degree)=> (degree)*(5/9) + 32

const fahrenheitToCelcius = (degree)=> (degree - 32)*(9/5)

module.exports = {
    checkSum,
    celciusToFahrenheit,
    fahrenheitToCelcius,
    add
}
