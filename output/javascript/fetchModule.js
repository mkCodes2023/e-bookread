const FetchBooks = (url,reslovedFunction,rejectedFunction)=>{
    const bookPromise= new Promise(async(resolve, reject) => {
        const booksData = await fetch(url)
    
        if (booksData.ok) {
            let json =await booksData.json();
    
            resolve(json)
        }else {
            reject(booksData)
        }
        
    })
    
    bookPromise.then(reslovedFunction,rejectedFunction).catch(err=>{throw Error(err)})
}

export default FetchBooks