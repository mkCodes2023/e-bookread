import FetchBooks from "./fetchModule.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')


let apiLink = "https://www.dbooks.org/api/book/" + id//"../books.json/"+id
FetchBooks(apiLink, reslovedFunction, rejectedFunction);

function reslovedFunction(x) {
    let title = document.querySelectorAll('[data-book-title]');
    let numberOfPages = document.querySelector('[data-pages]');
    let author = document.querySelector('[data-author]');
    let descript = document.querySelector('[data-description]')
    let pusblisher = document.querySelector('[data-publisher]')
    let subtitle = document.querySelector('[data-subtitle]');
    let year = document.querySelector('[data-year]');
    let bookImage = document.querySelector('[data-img]');
    let downloadlink = document.querySelector('[data-download]')
    let books = x;
    title.forEach((titl) => {
        titl.textContent = books.title
        console.log(titl);
    })

    console.log(books);
    numberOfPages.textContent = books.pages
    author.textContent = books.authors
    descript.textContent = books.description;
    pusblisher.textContent = books.publisher;
    subtitle.textContent = books.subtitle ? books.subtitle:"no subtitle for this book"
    year.textContent = books.year;
    bookImage.src = books.image
    downloadlink.href = books.download

}

function rejectedFunction(params) {

}

// console.log('hello');

let stars = document.querySelectorAll('[data-star]')
stars.forEach(star=>{
    star.addEventListener('click',()=>{
        bookRating(star,star.dataset.star_number)
    })
})

let rating = ["very bad","bad","good","very good","perfect"]

function bookRating (star,numberOfRating){
    let arr = []
    for (let i = 0; i < stars.length; i++) {
        const element = stars[i];
        if (element.dataset.star_number <= star.dataset.star_number) {
            element.classList.add('text-yellow-500')

        }else{
            element.classList.remove('text-yellow-500')

        }
    }

    
}