// modal window 
console.log("YO");
const addBook = document.getElementById("add-book");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector('.cross');


const openModal = () => {
    modal.classList.add('modal-active');
    overlay.classList.add('active');
}

const closeModal = () => {
    modal.classList.remove("modal-active");
    overlay.classList.remove("active");
}


addBook.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('keydown',(e)=>{
    if(e.key === "Escape") closeModal();
});

// add books
const submitBtn = document.querySelector('.submit-btn');

let library = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function renderInfo(){
    let libraryEl = document.querySelector(".library");
    libraryEl.innerHTML = '';
    for(let i = 0; i<library.length; i++){
       let book = library[i];
       let bookEl = document.createElement("div");
       bookEl.innerHTML = `
       <div class="book-container">
            <p class="book-name">${book.title}</p>
            <p class="book-author">${book.author}</p>
            <p class="book-pages">${book.pages}</p>
            <button class="read">${book.read? "Read":"Not Read"}</button>
        </div>
        `;
        libraryEl.appendChild(bookEl);
    }
}

function addBookToLibrary(){
    let title = document.querySelector(".title").value;
    let author = document.querySelector(".author").value;
    let pages = document.querySelector(".pages").value;
    let checkbox = document.querySelector("#checkbox").checked;
    let newBook = new Book(title, author, pages, checkbox);
    library.push(newBook);
    renderInfo();   
}


submitBtn.addEventListener('click', addBookToLibrary);
