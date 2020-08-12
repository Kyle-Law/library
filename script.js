// Variables
let myLibrary = [];
const bookShelf = document.getElementById('book-shelf');
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const addBookForm = document.getElementById('addbook-form');
const bookTitleEl = document.getElementById('book-title');
const bookAuthorEl = document.getElementById('book-author');
const bookPagesEl = document.getElementById('book-pages');
const bookPriceEl = document.getElementById('book-price');
const bookStatusEl = document.getElementById('book-status');

// Book Class
function Book(title, author, pages, price, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.price = price;
  this.status = status;
}

// Show Modal, Focus on Input
function showModal() {
  modal.classList.add('show-modal');
  bookTitleEl.focus();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function appendChildren(parent, children) {
  children.forEach((child) => parent.appendChild(child));
}

function validateForm() {
  return [
    bookTitleEl.value,
    bookAuthorEl.value,
    bookPriceEl.value,
    bookStatusEl.value,
  ].every((v) => v !== '');
}

function retriveBooks() {
  if (localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  } else {
    myLibrary = [
      new Book('JavaScript Demystified', 'kyle', 300, 19.9, 'Unread'),
      new Book('CSS Demystified', 'Kyle', 200, 9.9, 'Unread'),
      new Book('HTML Demystified', 'Kyle', 100, 9.9, 'Unread'),
    ];
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }
}

function render() {
  // Remove all book shelf elements
  bookShelf.textContent = '';
  retriveBooks();
  myLibrary.forEach((book, index) => {
    // Book Item
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.setAttribute('id', 'book-item');
    // Book Title
    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = book.title;
    // Book Author
    const author = document.createElement('h3');
    author.classList.add('author');
    author.textContent = `Author: ${book.author}`;
    // Book Pages
    const pages = document.createElement('h4');
    pages.classList.add('pages');
    pages.textContent = `Pages: ${book.pages}`;
    // Book Price
    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `$ ${book.price}`;
    const actionContainer = document.createElement('div');
    actionContainer.classList.add('action-container');
    // Read Button
    const readBtn = document.createElement('button');
    if (book.status === 'Read') {
      readBtn.textContent = 'Unread';
    } else {
      readBtn.textContent = 'Read';
    }
    readBtn.setAttribute('id', 'read');
    readBtn.classList.add('read');
    // Remove Button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('id', 'remove');
    removeBtn.classList.add('remove');
    // Append Nodes
    appendChildren(actionContainer, [readBtn, removeBtn]);
    appendChildren(bookItem, [title, author, pages, price, actionContainer]);
    bookShelf.appendChild(bookItem);
    // Add Event Listeners for Read and Remove buttons
    removeBtn.addEventListener('click', () => {
      bookShelf.removeChild(bookItem);
      myLibrary = myLibrary.filter((b) => b !== book);
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    });
    readBtn.addEventListener('click', () => {
      if (readBtn.textContent === 'Read') {
        myLibrary[index].status = 'Read';
        readBtn.textContent = 'Unread';
      } else {
        myLibrary[index].status = 'Unread';
        readBtn.textContent = 'Read';
      }
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    });
  });
}

/* eslint-disable no-alert */
function storeBook(e) {
  e.preventDefault();
  if (validateForm()) {
    const title = bookTitleEl.value;
    const author = bookAuthorEl.value;
    const price = bookPriceEl.value;
    const pages = bookPagesEl.value;
    const status = bookStatusEl.value;
    // Set book object, add to array
    const book = new Book(title, author, pages, price, status);
    addBookToLibrary(book);
    // Set bookmarks in localStorage, fetch, reset input fields
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    render();
    addBookForm.reset();
    bookTitleEl.focus();
  } else {
    alert('No empty values');
  }
}
/* eslint-enable no-alert */

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));
addBookForm.addEventListener('submit', storeBook);

// On Load
render();
