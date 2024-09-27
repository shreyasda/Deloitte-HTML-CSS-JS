const getData = () => {
    console.log('getData function call')
    return new Promise((resolve, reject) => {
        const isDataAvailable = true
        if(isDataAvailable){
            resolve({city : 'Pune'})
        }
        else{
            reject(console.log('Data Unavailable'))
        }
    })
}