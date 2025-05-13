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
  saveLibrary();
}

function renderBooksToPage(library) {
  const libraryContainer = document.querySelector(".library");
  libraryContainer.innerHTML = "";

  library.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const title = document.createElement("p");
    title.textContent = `Title: ${book.title}`;
    title.classList.add("title");

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const isRead = document.createElement("div");
    isRead.textContent = `Read: ${book.isRead ? "Yes" : "No"}`;
    isRead.classList.add("is-read");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "remove book";
    removeBtn.classList.add("delete-btn");

    isRead.addEventListener("click", () => {
      toggleReadStatus(book.id);
    });

    removeBtn.addEventListener("click", () => removeBook(book.id));

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(isRead);
    bookCard.appendChild(removeBtn);

    libraryContainer.appendChild(bookCard);
  });

  updateStatistics();
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
    saveLibrary();
    renderBooksToPage(myLibrary);
  }
}

function removeBook(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    saveLibrary();
    renderBooksToPage(myLibrary);
  }
}

function deleteAllBooks(library) {
  library.splice(0, library.length);
  saveLibrary();
  renderBooksToPage(myLibrary);
}

function updateStatistics() {
  const totalBooks = myLibrary.length;
  const totalPages = myLibrary.reduce((sum, book) => sum + book.pages, 0);
  const readBooks = myLibrary.filter((book) => book.isRead).length;
  const unreadBooks = totalBooks - readBooks;

  document.getElementById("total-books").textContent = totalBooks;
  document.getElementById("total-pages").textContent = totalPages;
  document.getElementById("read-books").textContent = readBooks;
  document.getElementById("unread-books").textContent = unreadBooks;
}

function saveLibrary() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function loadLibrary() {
  const data = localStorage.getItem("library");
  if (data) {
    const parsed = JSON.parse(data);
    myLibrary.length = 0;
    parsed.forEach((book) => {
      myLibrary.push(
        new Book(book.title, book.author, book.pages, book.isRead)
      );
    });
  }
}

function main() {
  loadLibrary();
  renderBooksToPage(myLibrary);

  document
    .querySelector(".form")
    .addEventListener("submit", handleNewBookSubmit);
  document.querySelector(".delete-all").addEventListener("click", () => {
    deleteAllBooks(myLibrary);
  });
}

main();
