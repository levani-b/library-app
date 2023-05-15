//modal wiindow
const addButton = document.getElementById('btn-add');
const modal = document.getElementById('add-book-modal');
const overlay = document.getElementById('overlay');

const openModal = () => {
    modal.classList.add('modal-active');
    overlay.classList.add('overlay-active');
}

const closeModal = () => {
    modal.classList.remove('modal-active');
    overlay.classList.remove('overlay-active');
}
addButton.addEventListener('click',openModal);
overlay.addEventListener('click', closeModal);
window.addEventListener('keydown', (key) => {
    if(key.key === "Escape"){
        closeModal();
    }
});

let myLibrary = [];

class Book {
  constructor(title, author,pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

const addBookToLibrary = (title,author,pages) =>{
  const newBook = new Book(title,author,pages);
   myLibrary.push(newBook);
   saveLibraryToLocalStorage();
}

const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const submitBtn = document.getElementById('submit-btn');
const bookForm = document.getElementById('add-book-form');
const bookContainer = document.getElementById('books-container');

const getInfoFromInputs = (event) => {
    event.preventDefault();

    let titleValue = bookTitle.value;
    let authorValue = bookAuthor.value;
    let pagesValue = parseInt(bookPages.value);
    if(titleValue || authorValue || pagesValue){
        addBookToLibrary(titleValue,authorValue,pagesValue);
        renderBooks();
        clearInputFields();
        closeModal();
    }else{
        alert('flii the fields');
    }

}

const renderBooks = () => {
    bookContainer.innerHTML = '';

    myLibrary.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const titleOutput = document.createElement('p');
        titleOutput.textContent = `Title : ${book.title}`;
        titleOutput.classList.add('title');

        const authorOutput = document.createElement('p');
        authorOutput.textContent = `Author : ${book.author}`
        authorOutput.classList.add('author');


        const pagesOutput = document.createElement('p')
        pagesOutput.textContent = `Pages : ${book.pages}`
        pagesOutput.classList.add('pages');


        bookElement.appendChild(titleOutput);
        bookElement.appendChild(authorOutput);
        bookElement.appendChild(pagesOutput);

        bookContainer.appendChild(bookElement);
    })
}
const clearInputFields = () => {
    bookForm.reset();
}

const saveLibraryToLocalStorage = () => {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
const loadLibraryFromLocalStorage = () => {
    const libraryData = localStorage.getItem('myLibrary');
    if (libraryData) {
      myLibrary = JSON.parse(libraryData);
      renderBooks();
    }
}

bookForm.addEventListener('submit',getInfoFromInputs);
window.addEventListener('load', loadLibraryFromLocalStorage);
console.log(myLibrary);