let myLibrary = [];
const btnContainer = document.getElementById("btn-container");
const bookShelf = document.getElementById("book-shelf");

function Book(title, author, price, status) {
  this.title = title;
  this.author = author;
  this.price = price;
  this.status = status;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addBookBtn() {
  const btn = document.createElement("button");
  btn.setAttribute("id", "add-book");
  btn.classList.add("add-book");
  btn.textContent = "Add Book";
  btnContainer.appendChild(btn);
}

function render(array) {
  addBookBtn();
}

render(myLibrary);
