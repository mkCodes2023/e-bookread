import FetchBooks from "./fetchModule.js";

let featuredBooks = document.querySelector('[data-featured-books]')
let featuredBooksTemplate = document.querySelector('[data-featured-books-template]');
let featuredBooksContainer = document.querySelector('[data-feauture-books-container]');

// slider
let Islider = document.querySelectorAll('[data-slider]');
let sliderNextButton = document.querySelector('[data-slider-next]');
let sliderPreviousButton = document.querySelector('[data-slider-previous]');
let educationBooks = document.querySelector('[data-edcuation-book]')
class Slider {
    constructor(slider,sliderIndex) {
        this.slider = slider
        this.counter = 0
        this.sliderIndex = sliderIndex
        // this.updateSlide()
    }

    nextSlide() {
        
        console.log(this.counter);
        if (this.counter >= this.slider.length - 1) {
            this.counter = 0
        } else {
            this.counter = this.counter + 1
        }
        this.updateSlide()
    }

    quickSwitch(toX){

        this.counter= toX;
        this.updateSlide()

    }

    prevSlide() {
        if (this.counter <= 0) {
            this.counter = this.slider.length -1
        } else {
            this.counter = --this.counter 
        }
        this.updateSlide()

        console.log({PEV:this.counter});

    }

    autoSlide() {
        
        if (this.counter >= this.slider.length - 1) {
            this.counter = 0
        } else {
            this.counter = this.counter + 1
        }

        this.updateSlide()
        console.log(this.counter);
    }


    updateSlide() {
        
        for (let i = 0; i < this.slider.length; i++) {
            const element = this.slider[i];

            // console.log(element);
            if (i == this.counter) {
                element.classList.add('currentslide');
                element.classList.remove('offslide')

                // console.log({ counter, i, element });

            } else {
                element.classList.remove('currentslide')
                element.classList.add('offslide')

            }

            if (sliderIndex[i].dataset.slider_index == this.counter) {
                sliderIndex[i].classList.add('bg-gray-600')

            }else{
                sliderIndex[i].classList.remove('bg-gray-600')

            }
        }
    }
}

let sliderIndex = document.querySelectorAll('[data-pointer]')



const ImageSlider  = new Slider(Islider,sliderIndex)
setInterval(()=>{let automaticSlide = ImageSlider.autoSlide()
}, 8000)

sliderIndex.forEach(index=>{
    // ImageSlider.quickSwitch(index)
    index.onclick = ()=>{
    ImageSlider.quickSwitch(Number(index.dataset.slider_index))

    }
})

sliderNextButton.onclick = ()=>{
    ImageSlider.nextSlide()
}

sliderPreviousButton.onclick = ()=>{
    ImageSlider.prevSlide()
}


//******************************** Book fetch section ****************************************************/
// let apiLink = "https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=8b6TdVsJ9fXIxnCshkqxHGfUWCWmCTQa"
let apiLink = "https://www.dbooks.org/api/recent" //"../books.json"
FetchBooks(apiLink, reslovedFunction, rejectedFunction)
let id
const viewsingleBooks = (e) => {
    id = e

    document.location.href = "./singleBooks.html?id=" + id


}


function reslovedFunction(x) {
    let books = x.books;
    shuffleArray(books)

    books.map((singleBook, key) => {
        let singleBooks = featuredBooksTemplate.content.cloneNode(true).children[0]
        let head = singleBooks.querySelector('[data-head]');
        let body = singleBooks.querySelector('[data-body]')
        let link = singleBooks.querySelector('[data-link]');
        let dataImage = singleBooks.querySelector('[data-image]')
        let author = singleBooks.querySelector('[data-author]');

        author.textContent = singleBook.authors

        singleBooks.id = singleBook.id;
        singleBooks.style.zIndex = 10000
        singleBooks.onclick = () => { viewsingleBooks(singleBook.id) }
        dataImage.src = singleBook.image
        link.href = singleBook.url



        if (singleBook.title !== "" && singleBook.summary !== "" && key < 12 && key >= 0) {
            featuredBooks.append(singleBooks)
        } else {
            console.log(key);
        }


    })

    //    console.log(books);
}

function rejectedFunction(y) {
    console.log(y);
}

function shuffleArray(array) {
    let arr = []
    for (let i = 0; i < array.length; i++) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i (inclusive)
        // Swap array[i] and array[j]

        let b = [array[i], array[j]] = [array[j], array[i]];

    }
}

//******************************************************* educational book fetch  ****************************************************************/
let educationBooksUri = "https://www.dbooks.org/api/search/educational"/*'../books.json'*/
FetchBooks(educationBooksUri,educationBooksResolve,educationBooksReject)


function educationBooksResolve (educationBooksData){
    let eduBooks = educationBooksData.books
    shuffleArray(eduBooks);
    console.log(eduBooks);
    eduBooks.map((data,key)=>{
        let singleBooks = featuredBooksTemplate.content.cloneNode(true).children[1];
        let image = singleBooks.querySelector('[data-image2]');
        image.src = data.image;
        let title = singleBooks.querySelector('[data-text-title]')
        title.textContent  = data.title;
        singleBooks.onclick = () => { viewsingleBooks(data.id) }
        if (key < 20) {
            educationBooks.append(singleBooks)
        }
    })
}

function educationBooksReject(params) {
    
}


// ************************* educational content fetch ************************************************************************


// **************************************** eductional book scroller function *******************************************/
let bookScroller = document.querySelectorAll('[data-scroller]');

function bookscroller (param){
    let theBooksContainer = document.querySelector('[data-educational-container]')

    let width = theBooksContainer.getBoundingClientRect().width;

    if (param == "left") {
        educationBooks.scrollLeft += width;
    }
    if (param == "right") {
        educationBooks.scrollLeft += -width
    }
}

bookScroller.forEach((scroll)=>{
    scroll.onclick = ()=>{
        bookscroller(scroll.dataset.scroll)
    }
})

educationBooks.onscroll = (e)=>{
    let childrenElement = e.target.children

    let main = educationBooks.getBoundingClientRect().width/2
    // console.log(main);
    for (let i = 0; i < childrenElement.length; i++) {
        const element = childrenElement[i];
        let left = element.getBoundingClientRect().left;
        let width  = element.getBoundingClientRect().width;
        if (left < main && left > main-width) {
            element.classList.add("main")
        }else{
            element.classList.remove('main')
        }
        // console.log(left);
    }
}