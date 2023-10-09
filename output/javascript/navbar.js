let dropDownContainer = document.querySelectorAll('[data-drop-down-container]')
let featuredBooks = document.querySelector('[data-featured-books]')
let featuredBooksTemplate = document.querySelector('[data-featured-books-template]');
let featuredBooksContainer = document.querySelector('[data-feauture-books-container]');
let preLoader = document.querySelector('[data-preloader]')
dropDownContainer.forEach((element)=>{
    let dropDown = element.querySelectorAll(' [data-drop-down]')

    console.log('dropDownContainer');
    element.onclick = ()=>{    
       dropDown.forEach((element2)=>{
        if (element2.classList.contains('opacity-0')) {
            element2.classList.add('opacity-100')
            element2.classList.remove('opacity-0')
            console.log('hello');
           }else {
            element2.classList.add('opacity-0')
            console.log('y');
            element2.classList.remove('opacity-100')
           }
       })
     }
})

window.onload = ()=>{
    setTimeout(() => {
        preLoader.classList.add('hidden')

    }, 500);
}
