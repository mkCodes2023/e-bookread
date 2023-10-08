import FetchBooks from "./fetchModule.js";

let featuredBooks = document.querySelector('[data-featured-books]')
let featuredBooksTemplate = document.querySelector('[data-featured-books-template]');
let featuredBooksContainer = document.querySelector('[data-feauture-books-container]');

// slider
let slider = document.querySelectorAll('[data-slider]')
let counter = 0;

function sliderFunction() {

   for (let i = 0; i < slider.length; i++) {
    const element = slider[i];
    
    if (i == counter) {
        element.classList.add('currentslide');
        element.classList.remove('offslide')
        // console.log({counter,i,element});

    }else{
        element.classList.remove('currentslide')
        element.classList.add('offslide')
    }
   }  
    counter = counter+1
}

setInterval(sliderFunction, 1000)

//******************************** Book fetch section ****************************************************/
// let apiLink = "https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=8b6TdVsJ9fXIxnCshkqxHGfUWCWmCTQa"
let apiLink = /*"https://www.dbooks.org/api/recent" */"../books.json"
FetchBooks(apiLink,reslovedFunction,rejectedFunction)
let id
const viewsingleBooks = (e)=>{
    id = e

    document.location.href = "./singleBooks.html?id="+id
}


function reslovedFunction (x){
   let books = x.books;
   shuffleArray(books)
   
   books.map((singleBook,key)=>{
    let singleBooks = featuredBooksTemplate.content.cloneNode(true).children[0]
    let head = singleBooks.querySelector('[data-head]');
    let body = singleBooks.querySelector('[data-body]')
    let link = singleBooks.querySelector('[data-link]');
    let dataImage = singleBooks.querySelector('[data-image]')
    let author = singleBooks.querySelector('[data-author]');

    author.textContent = singleBook.authors

    singleBooks.id = singleBook.id;
    singleBooks.style.zIndex = 10000
    singleBooks.onclick = ()=>{viewsingleBooks(singleBook.id)}
    dataImage.src = singleBook.image
    link.href = singleBook.url

    

    if (singleBook.title !=="" && singleBook.summary !=="" && key< 12 && key>=0) {
        featuredBooks.append(singleBooks)
    }else{
        console.log(key);
    }

   
   })

//    console.log(books);
}

function rejectedFunction(y) {
    console.log(y);
}

function shuffleArray(array) {
    let arr  = []
    for (let i = 0; i<array.length ; i++) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i (inclusive)
      // Swap array[i] and array[j]

      let  b = [array[i], array[j]] = [array[j], array[i]];
      
    }
  }
  
// ************************* end of fetch section ************************************************************************

