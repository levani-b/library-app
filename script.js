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
overlay.addEventListener('click',()=>{
    closeModal();
    deleteModalClose();
    bookForm.reset();
    errorMsg.style.visibility = "hidden";
} );
window.addEventListener('keydown', (key) => {
    if(key.key === "Escape"){
        closeModal();
        deleteModalClose();
        bookForm.reset();
        errorMsg.style.visibility = "hidden";
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
const errorMsg = document.querySelector('.error');


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

    if(titleValue.trim()=='' || authorValue.trim()=='' || pagesValue <= 0 || isNaN(pagesValue)){
        errorMsg.style.visibility = "visible";
        return;
    }else{
        errorMsg.style.visibility = "hidden";
        addBookToLibrary(titleValue,authorValue,pagesValue,isReadValue);
        renderBooks();
        clearInputFields();
        updateBookCounts();
        closeModal();
    }
}

const renderBooks = () => {
    bookContainer.innerHTML = '';

        myLibrary.forEach((book,index) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const titleOutput = document.createElement('p');
        titleOutput.textContent = `${book.title}`;
        titleOutput.classList.add('title');

        const authorOutput = document.createElement('p');
        authorOutput.textContent = `by ${book.author}`
        authorOutput.classList.add('author');


        const pagesOutput = document.createElement('p');
        pagesOutput.textContent = `Pages : ${book.pages}`
        pagesOutput.classList.add('pages');

        const readBtn = document.createElement('button');
        readBtn.classList.add('btn','read-btn');

        const deleteBtn =document.createElement('button');
        deleteBtn.classList.add('btn', 'remove-btn');
        deleteBtn.textContent = 'Remove';

        deleteBtn.addEventListener('click', ()=> {
            deleteBook(index);
        });
        const line = document.createElement('div');
        line.classList.add('line-el');

        const bookElBtnDiv = document.createElement('div');
        bookElBtnDiv.classList.add('btn-container');

        bookElement.appendChild(titleOutput);
        bookElement.appendChild(authorOutput);
        bookElement.appendChild(pagesOutput);
        bookElement.appendChild(line);
        bookElement.appendChild(bookElBtnDiv);
        bookElBtnDiv.appendChild(readBtn);
        bookElBtnDiv.appendChild(deleteBtn);

        updateButtonColor(readBtn, book);
        readBtn.addEventListener('click', () => {
            book.isRead = !book.isRead;
            updateButtonColor(readBtn, book);
            saveLibraryToLocalStorage(); 
            updateBookCounts();
        });


        bookContainer.appendChild(bookElement);
    });
};

//Count Books
let booksRead = document.getElementById('books-read');
let booksNotRead = document.getElementById('books-not-read');
let totalBooks = document.getElementById('total-books');

const updateBookCounts = () =>{
    let booksReadCount = 0;
    let booksNotReadCount = 0;

    myLibrary.forEach(book => {
        if (book.isRead) {
            booksReadCount++;
        } else {
            booksNotReadCount++;
        }
    });
    booksRead.textContent = `Books Read: ${booksReadCount}`;
    booksNotRead.textContent = `Books Not Read: ${booksNotReadCount}`;
    totalBooks.textContent = `Total Books: ${myLibrary.length}`;
};

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
};

const clearInputFields = () => {
    bookForm.reset();
};

const saveLibraryToLocalStorage = () => {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};
const loadLibraryFromLocalStorage = () => {
    const libraryData = localStorage.getItem('myLibrary');
    if (libraryData) {
      myLibrary = JSON.parse(libraryData);
      renderBooks();
    }
}
const deleteBook = (index) => {
    myLibrary.splice(index, 1);
    saveLibraryToLocalStorage(); 
    renderBooks();
    updateBookCounts();
}

//clear all
const deleteAllBtn = document.getElementById('delete-all');
const deleteModal = document.getElementById('modal-for-delete');
const yesBtn = document.getElementById('btn-y');
const noBtn = document.getElementById('btn-n');

const deleteAll = () => {
    myLibrary.splice(0,myLibrary.length);
    saveLibraryToLocalStorage(); 
    renderBooks();
    updateBookCounts();
}

const deleteModalOpen = () => {
    deleteModal.classList.add('modal-active');
    overlay.classList.add('overlay-active');
}
const deleteModalClose = () => {
    deleteModal.classList.remove('modal-active');
    overlay.classList.remove('overlay-active');
}
noBtn.addEventListener('click',deleteModalClose);
deleteAllBtn.addEventListener('click', ()=>{
    deleteModalOpen();
});
yesBtn.addEventListener('click',()=>{
    deleteAll();
    deleteModalClose();
});

submitBtn.addEventListener('click',getInfoFromInputs);
window.addEventListener('load',()=>{
    loadLibraryFromLocalStorage();
    updateBookCounts(); 
});
