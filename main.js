const addBookbtn = document.querySelector('#addBookbtn');
const cardViewbtn = document.querySelector ('#cardView');
const tableViewbtn = document.querySelector('#tableView')
const bookTitle = document.querySelector('#bookTitle');
const authorName = document.querySelector('#authorName');
const pageNumber = document.querySelector('#pageNumber');
const readCheck = document.querySelector('#readCheckbox');
const library = document.querySelector('#library');

let myLibrary = [];
let cardDefaultview = true; 

class Book {
    constructor (title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  }

function addBookToLibrary(e) {
  e.preventDefault();

  let title = bookTitle.value;
  let author = authorName.value;
  let page = pageNumber.value;
  let read = readCheck.checked; 
  
  const newBook = new Book (title, author, page, read);
  myLibrary.push(newBook);
  viewChecker();
};


function viewChecker() {
  if (cardDefaultview === true) {
    renderCardlibrary();
  } else {
    renderTablelibrary();
  } 
}

function renderCardlibrary() {
  cardDefaultview = true;
  library.innerHTML = "";
  for(let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookCard = document.createElement('div');
    let cardBody = document.createElement('div');
    let title = document.createElement('h4');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let read = document.createElement('p');

    let btnGroup = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let readBtn = document.createElement('button');
   
    bookCard.classList.add('card', 'col-3', 'm-3', 'p-0', 'text-bg-secondary');
    title.classList.add('card-header', 'text-bg-warning');
    cardBody.classList.add('card-body');
    author.classList.add('card-text');
    pages.classList.add('card-text');
    read.classList.add('card-text');

    btnGroup.classList.add('card-text', 'd-flex', 'justify-content-center','gap-1', 
    'btn-group', 'btn-group-sm');
    deleteBtn.classList.add('btn','btn-dark', 'deleteBookcard');
    readBtn.classList.add('btn','btn-warning');
   
    title.textContent = `${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Page Number: ${book.pages}`;
    read.textContent = `Have I read this book: ${book.read}`
    deleteBtn.textContent = 'Delete';
    readBtn.textContent = `Read`

    cardBody.appendChild(author);
    cardBody.appendChild(pages);
    cardBody.appendChild(read);
    btnGroup.appendChild(readBtn); 
    btnGroup.appendChild(deleteBtn); 
    cardBody.appendChild(btnGroup);
    bookCard.appendChild(title);
    bookCard.appendChild(cardBody);


    library.appendChild(bookCard);
  } updateBtnlook();
};

function renderTablelibrary() {
  cardDefaultview = false; 
  library.innerHTML = "";
  let table = document.createElement('table');

  let tableHead = document.createElement('thead')
  let tableRowheader = document.createElement('tr');
  let titleHeader = document.createElement('th');
  let authorHeader = document.createElement('th');
  let pageHeader = document.createElement('th');
  let readHeader = document.createElement('th');
  let removeHeader = document.createElement('th');
  let toggleHeader = document.createElement('th');

  table.classList.add('table', 'text-light', 'text-center', 'table-border', 
 'border-warning', 'table-responsive', 'mt-5');
  tableRowheader.classList.add('text-bg-warning');

  titleHeader.textContent = `Title`;
  authorHeader.textContent = `Author`;
  pageHeader.textContent = `Page Number`;
  readHeader.textContent = `Have you read this book?`
  removeHeader.textContent = `Remove`
  toggleHeader.textContent = 'Toggle Read'

  tableHead.appendChild(tableRowheader);
  tableRowheader.appendChild(titleHeader);
  tableRowheader.appendChild(authorHeader);
  tableRowheader.appendChild(pageHeader);
  tableRowheader.appendChild(readHeader);
  tableRowheader.appendChild(toggleHeader);
  tableRowheader.appendChild(removeHeader);


  table.appendChild(tableHead);

  for(let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];

    let tableBody = document.createElement('tbody');
    let tableBodyrow = document.createElement('tr');
    let tableBodytitle = document.createElement('td');
    let tableBodyauthor = document.createElement('td');
    let tableBodypage = document.createElement('td');
    let tableBodyread = document.createElement('td');
    let tableBodyremove = document.createElement('td');
    let removeBtn = document.createElement('button');
    let tableBodytoggle = document.createElement('td');
    let toggleBtn = document.createElement('button');

    removeBtn.classList.add('btn','btn-dark','btn-sm');
    toggleBtn.classList.add('btn','btn-warning','btn-sm');
    tableBody.classList.add('align-middle', 'text-bg-secondary')

    tableBodytitle.textContent = `${book.title}`;
    tableBodyauthor.textContent = `${book.author}`;
    tableBodypage.textContent = `${book.pages}`;
    tableBodyread.textContent = `${book.read}`
    removeBtn.textContent = 'Delete'
    toggleBtn.textContent = 'Read'

    tableBody.appendChild(tableBodyrow);
    tableBodyrow.appendChild(tableBodytitle);
    tableBodyrow.appendChild(tableBodyauthor);
    tableBodyrow.appendChild(tableBodypage);
    tableBodyrow.appendChild(tableBodyread);
    tableBodyrow.appendChild(tableBodytoggle);
    tableBodytoggle.appendChild(toggleBtn);
    tableBodyremove.appendChild(removeBtn);
    tableBodyrow.appendChild(tableBodyremove);
    

    table.appendChild(tableBody)
  }  library.appendChild(table);
     updateBtnlook();
};

function updateBtnlook() {
  if (cardDefaultview === true) {
    cardViewbtn.classList.remove('btn-outline-light');
    cardViewbtn.classList.add('btn-light')
    tableViewbtn.classList.remove('btn-light');
    tableViewbtn.classList.add('btn-outline-light');
  } else {
    cardViewbtn.classList.remove('btn-light');
    cardViewbtn.classList.add('btn-outline-light')
    tableViewbtn.classList.remove('btn-outline-light');
    tableViewbtn.classList.add('btn-light')
  } 
};

const deleteBtnarray = document.querySelectorAll('.deleteBookcard')

function removeBookcard() {
  console.log(deleteBtnarray)
}

addBookbtn.addEventListener('click', addBookToLibrary);
cardViewbtn.addEventListener('click', renderCardlibrary);
tableViewbtn.addEventListener('click', renderTablelibrary);
deleteBtnarray.forEach(btn => btn.addEventListener('click', removeBookcard));
