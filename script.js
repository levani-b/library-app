const myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function renderBooksToPage(library) {
  const libraryContainer = document.querySelector(".library");
  libraryContainer.innerHTML = "";

  library.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const title = document.createElement("p");
    title.textContent = `Title: ${book.title}`;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const isRead = document.createElement("div");
    isRead.textContent = `Read: ${book.isRead ? "Yes" : "No"}`;
    isRead.classList.add("is-read");

    isRead.addEventListener("click", () => {
      toggleReadStatus(book.id);
    });

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(isRead);

    libraryContainer.appendChild(bookCard);
  });
}

function handleNewBookSubmit(e) {
  e.preventDefault();
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readCheckbox = document.getElementById("read-status");

  let hasError = false;

  [titleInput, authorInput, pagesInput].forEach((input) => {
    input.style.border = "";
  });

  if (titleInput.value.trim() === "") {
    titleInput.style.border = "2px solid red";
    hasError = true;
  }
  if (authorInput.value.trim() === "") {
    authorInput.style.border = "2px solid red";
    hasError = true;
  }
  if (pagesInput.value.trim() === "") {
    pagesInput.style.border = "2px solid red";
    hasError = true;
  }

  if (hasError) return;

  addBookToLibrary(
    titleInput.value.trim(),
    authorInput.value.trim(),
    Number(pagesInput.value),
    readCheckbox.checked
  );

  renderBooksToPage(myLibrary);

  e.target.reset();
}

function toggleReadStatus(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    myLibrary[bookIndex].isRead = !myLibrary[bookIndex].isRead;
    renderBooksToPage(myLibrary);
  }
}
document.querySelector(".form").addEventListener("submit", handleNewBookSubmit);
