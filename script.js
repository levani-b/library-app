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
  constructor(title,author,pages,isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

const addBookToLibrary = (title,author,pages,isRead) =>{
  const newBook = new Book(title,author,pages,isRead);
   myLibrary.push(newBook);
   saveLibraryToLocalStorage();
}

const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const checkBox = document.getElementById('is-read');
const submitBtn = document.getElementById('submit-btn');
const bookForm = document.getElementById('add-book-form');
const bookContainer = document.getElementById('books-container');

const getInfoFromInputs = (event) => {
    event.preventDefault();

    let titleValue = bookTitle.value;
    let authorValue = bookAuthor.value;
    let pagesValue = parseInt(bookPages.value);
    let isReadValue = checkBox.checked;

    if(isReadValue){
        isReadValue = true;
    }else{
        isReadValue = false;
    }
    if(titleValue || authorValue || pagesValue){
        addBookToLibrary(titleValue,authorValue,pagesValue,isReadValue);
        renderBooks();
        clearInputFields();
        closeModal();
    }else{
        alert('flii the fields');
    }

}

const renderBooks = () => {
    bookContainer.innerHTML = '';

    myLibrary.forEach((book) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const titleOutput = document.createElement('p');
        titleOutput.textContent = `Title : '${book.title}'`;
        titleOutput.classList.add('title');

        const authorOutput = document.createElement('p');
        authorOutput.textContent = `Author : ${book.author}`
        authorOutput.classList.add('author');


        const pagesOutput = document.createElement('p');
        pagesOutput.textContent = `Pages : ${book.pages}`
        pagesOutput.classList.add('pages');

        const readBtn = document.createElement('button');
        readBtn.classList.add('btn');


        bookElement.appendChild(titleOutput);
        bookElement.appendChild(authorOutput);
        bookElement.appendChild(pagesOutput);
        bookElement.appendChild(readBtn);
        
        updateButtonColor(readBtn, book);
        readBtn.addEventListener('click', () => {
            book.isRead = !book.isRead;
            updateButtonColor(readBtn, book);
            saveLibraryToLocalStorage(); 
        });

        bookContainer.appendChild(bookElement);
    })
}

const updateButtonColor = (button, book) => {
    if (book.isRead) {
      button.textContent = 'Read';
      button.classList.remove('btn-red');
      button.classList.add('btn-green');
    } else {
      button.textContent = 'Not Read';
      button.classList.remove('btn-green');
      button.classList.add('btn-red');
    }
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