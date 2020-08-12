// Variables
let myLibrary = [];
const btnContainer = document.getElementById("btn-container");
const bookShelf = document.getElementById("book-shelf");
const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const addBookForm = document.getElementById("addbook-form");
const bookTitleEl = document.getElementById("book-title");
const bookAuthorEl = document.getElementById("book-author");
const bookPriceEl = document.getElementById("book-price");
const bookStatusEl = document.getElementById("book-status");

// Book Class
function Book(title, author, price, status) {
  this.title = title;
  this.author = author;
  this.price = price;
  this.status = status;
}

// Show Modal, Focus on Input
function showModal() {
  modal.classList.add("show-modal");
  bookTitleEl.focus();
}

function storeBook(e) {
  e.preventDefault();
  const title = bookTitleEl.value;
  const author = bookAuthorEl.value;
  const price = bookPriceEl.value;
  const status = bookStatusEl.value;

  // Set book object, add to array
  const book = new Book(title, author, price, status);
  addBookToLibrary(book);
  // Set bookmarks in localStorage, fetch, reset input fields
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  render();
  addBookForm.reset();
  bookTitleEl.focus();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function retriveBooks() {
  if (localStorage.getItem("myLibrary")) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  } else {
    myLibrary = [
      new Book("JavaScript Demystified", "kyle", 19.9, "Unread"),
      new Book("CSS Demystified", "Kyle", 9.9, "Unread"),
      new Book("HTML Demystified", "Kyle", 9.9, "Unread"),
    ];
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }
}

function appendChildren(parent, children) {
  children.forEach((child) => parent.appendChild(child));
}

function removeBook() {
  bookShelf.removeChild(bookItem);
  myLibrary = myLibrary.filter((b) => b !== book);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function render() {
  // Remove all book shelf elements
  bookShelf.textContent = "";
  retriveBooks();
  myLibrary.forEach((book, index) => {
    // Book Item
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.setAttribute("id", "book-item");
    // Book Title
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = book.title;
    // Book Author
    const author = document.createElement("h2");
    author.classList.add("author");
    author.textContent = book.author;
    // Book Price
    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `$ ${book.price}`;
    const actionContainer = document.createElement("div");
    actionContainer.classList.add("action-container");
    // Read Button
    const readBtn = document.createElement("button");
    if (book.status === "Read") {
      readBtn.textContent = "Unread";
    } else {
      readBtn.textContent = "Read";
    }
    readBtn.setAttribute("id", "read");
    readBtn.classList.add("read");
    // Remove Button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("id", "remove");
    removeBtn.classList.add("remove");
    // Append Nodes
    appendChildren(actionContainer, [readBtn, removeBtn]);
    appendChildren(bookItem, [title, author, price, actionContainer]);
    bookShelf.appendChild(bookItem);
    // Add Event Listeners for Read and Remove buttons
    removeBtn.addEventListener("click", () => {
      bookShelf.removeChild(bookItem);
      myLibrary = myLibrary.filter((b) => b !== book);
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    });
    readBtn.addEventListener("click", () => {
      if (readBtn.textContent === "Read") {
        myLibrary[index].status = "Read";
        readBtn.textContent = "Unread";
      } else {
        myLibrary[index].status = "Unread";
        readBtn.textContent = "Read";
      }
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    });
  });
}

// Modal Event Listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);
addBookForm.addEventListener("submit", storeBook);

// On Load
render();
