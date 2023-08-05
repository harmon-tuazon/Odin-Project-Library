const addBookbtn = document.querySelector('#addBookbtn');

let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary(e) {
  e.preventDefault();

}


addBookbtn.addEventListener('click', addBookToLibrary);