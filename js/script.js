// console.log("Hello World!")
// console.log(10+20)
// let num = 10.5
// console.log(typeof(num))
// num = "sda"
// console.log(typeof(num))
// num = false
// console.log(typeof(num))

//Array
let array = [1,true,'shreyas']
// for(let element in array)
//     console.log(array[element])
//Object
const employee = {
    id: 1001,
    name : 'Shreyas',
    salary: 20000,
    address : {
        house : 296,
        street : 12,
        area : 'Vijayanagar'
    },
    ismarried : false
}

// console.log(employee)
// console.log(employee.name, employee.address.street)

const addNums = (a, b) => {
    console.log(a+b)
}

addNums(10, 20)
addNums(10, 20, 30)

const func = (name) => {
    return "Hello " + name
}

console.log(func("Shreyas"))