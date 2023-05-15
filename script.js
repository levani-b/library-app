let myLibrary = [];

class Book {
  constructor(title, author){
    this.title = title;
    this.author = author;
  }
}

const addBookToLibrary = (title,author) =>{
  const newBook = new Book(title,author);
   myLibrary.push(newBook);
}

const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const submitBtn = document.getElementById('submit-btn');
const bookContainer = document.getElementById('books-container');

const getInfoFromInputs = (event) => {
    event.preventDefault();

    let titleValue = bookTitle.value;
    let authorValue = bookAuthor.value;

    addBookToLibrary(titleValue,authorValue);
    makeElements(titleValue, authorValue);
}

const makeElements = (title, author) => {
    const titleOutput = document.createElement('p');
    const authorOutput = document.createElement('p');

    titleOutput.textContent = title;
    authorOutput.textContent = author;


    bookContainer.appendChild(titleOutput);
    bookContainer.appendChild(authorOutput);
}

submitBtn.addEventListener('click', getInfoFromInputs);
console.log(myLibrary);