const addBookbtn = document.querySelector('#addBookbtn');
const cardViewbtn = document.querySelector ('#cardView');
const tableViewbtn = document.querySelector('#tableView')
const library = document.querySelector('#library');
const sortBtns = document.querySelectorAll('.sortBtn');
const modal = document.querySelector('#myModal');
const overlay = document.querySelector('.overlay');
const saveChangebtn = document.querySelector('#saveChangesBtn');
const closeModalbtn = document.querySelector('#closeModalbtn');


let myLibrary = [];
let cardDefaultview = true; 
let editedBook = '';

class Book {
    constructor (title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    } 
};

Book.prototype.changeStatus = function() {
  this.read = !this.read
};



function addBookToLibrary(e) {
  e.preventDefault();

  const bookTitle = document.querySelector('#bookTitle');
  const authorName = document.querySelector('#authorName');
  const pageNumber = document.querySelector('#pageNumber');
  const readCheck = document.querySelector('#readCheckbox');

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
    let editBtn = document.createElement('button');
   
    bookCard.classList.add('card', 'col-3', 'm-3', 'p-0', 'text-bg-secondary');
    title.classList.add('card-header', 'text-bg-warning');
    cardBody.classList.add('card-body');
    author.classList.add('card-text');
    pages.classList.add('card-text');
    read.classList.add('card-text');

    btnGroup.classList.add('card-text', 'd-flex', 'justify-content-center','gap-1', 
    'btn-group', 'btn-group-sm');
    deleteBtn.classList.add('btn','btn-dark');
    readBtn.classList.add('btn','btn-warning');
    editBtn.classList.add('btn','btn-success');

    title.textContent = `${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Page Number: ${book.pages}`;
    read.textContent = `Have I read this book: ` + book.read.toString().toUpperCase();
    deleteBtn.textContent = 'Delete';
    readBtn.textContent = `Read`
    editBtn.textContent = 'Edit'

    cardBody.appendChild(author);
    cardBody.appendChild(pages);
    cardBody.appendChild(read);
    btnGroup.appendChild(readBtn); 
    btnGroup.appendChild(deleteBtn); 
    btnGroup.appendChild(editBtn);
    cardBody.appendChild(btnGroup);
    bookCard.appendChild(title);
    bookCard.appendChild(cardBody);

    library.appendChild(bookCard);

    deleteBtn.addEventListener('click', () => {removeBookcard(book)});
    readBtn.addEventListener('click', () => {toggleStatus(book)});
    editBtn.addEventListener('click', () => {popoutModal(book)});
  } updateBtnlook();
};

function renderTablelibrary() {
  cardDefaultview = false; 
  library.innerHTML = "";
  let table = document.createElement('table');

  let tableHead = document.createElement('thead')
      tableRowheader = document.createElement('tr');
      titleHeader = document.createElement('th');
      authorHeader = document.createElement('th');
      pageHeader = document.createElement('th');
      readHeader = document.createElement('th');
      removeHeader = document.createElement('th');
      toggleHeader = document.createElement('th');
      editHeader = document.createElement('th');

  table.classList.add('table', 'text-light', 'text-center', 'table-border', 
 'border-warning', 'table-responsive', 'mt-2');
  tableRowheader.classList.add('text-bg-warning');

  titleHeader.textContent = `Title`;
  authorHeader.textContent = `Author`;
  pageHeader.textContent = `Page Number`;
  readHeader.textContent = `Have you read this book?`
  removeHeader.textContent = `Remove`
  toggleHeader.textContent = 'Toggle Read'
  editHeader.textContent = 'Edit Information'

  tableHead.appendChild(tableRowheader);
  tableRowheader.appendChild(titleHeader);
  tableRowheader.appendChild(authorHeader);
  tableRowheader.appendChild(pageHeader);
  tableRowheader.appendChild(readHeader);
  tableRowheader.appendChild(toggleHeader);
  tableRowheader.appendChild(removeHeader);
  tableRowheader.appendChild(editHeader);


  table.appendChild(tableHead);

  for(let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
        tableBody = document.createElement('tbody');
        tableBodyrow = document.createElement('tr');
        tableBodytitle = document.createElement('td');
        tableBodyauthor = document.createElement('td');
        tableBodypage = document.createElement('td');
        tableBodyread = document.createElement('td');
        tableBodyremove = document.createElement('td');
        removeBtn = document.createElement('button');
        tableBodytoggle = document.createElement('td');
        toggleBtn = document.createElement('button');
        tableBodyedit = document.createElement('td');
        editBtn = document.createElement('button');


    removeBtn.classList.add('btn','btn-dark','btn-sm');
    toggleBtn.classList.add('btn','btn-warning','btn-sm');
    editBtn.classList.add('btn','btn-success');
    tableBody.classList.add('align-middle', 'text-bg-secondary')

    tableBodytitle.textContent = `${book.title}`;
    tableBodyauthor.textContent = `${book.author}`;
    tableBodypage.textContent = `${book.pages}`;
    tableBodyread.textContent = book.read.toString().toUpperCase();
    removeBtn.textContent = 'Delete'
    toggleBtn.textContent = 'Read'
    editBtn.textContent = 'Edit'

    tableBody.appendChild(tableBodyrow);
    tableBodyrow.appendChild(tableBodytitle);
    tableBodyrow.appendChild(tableBodyauthor);
    tableBodyrow.appendChild(tableBodypage);
    tableBodyrow.appendChild(tableBodyread);
    tableBodytoggle.appendChild(toggleBtn);
    tableBodyrow.appendChild(tableBodytoggle);
    tableBodyremove.appendChild(removeBtn);
    tableBodyrow.appendChild(tableBodyremove);
    tableBodyedit.appendChild(editBtn);
    tableBodyrow.appendChild(tableBodyedit);
    
    
    table.appendChild(tableBody)

    removeBtn.addEventListener('click', () => {removeBookcard(book)});
    toggleBtn.addEventListener('click', () => {toggleStatus(book)});
    editBtn.addEventListener('click', () => {popoutModal(book)});
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

function removeBookcard(book) {
  myLibrary.splice(book,1);
  viewChecker();
}

function toggleStatus(book) {
  book.changeStatus();
  viewChecker();
}

function sortArray(e){
  if(e.target.id === "sortAscend") {
    myLibrary.sort((a, b) => {
      let titleA = a.title.toLowerCase(),
          titleB = b.title.toLowerCase();

      if (titleA > titleB) {
          return 1;
      }
      else if (titleA < titleB) {
          return -1;
      }
      return 0;
})}
   else if (e.target.id === "sortDescend") {
    myLibrary.sort((a, b) => {
      let titleA = a.title.toLowerCase(),
          titleB = b.title.toLowerCase();

      if (titleB > titleA) {
          return 1;
      }
      else if (titleB < titleA) {
          return -1;
      }
      return 0;
})}
  else if(e.target.id === "sortStatus") {
  myLibrary.sort((a, b) => { return b.read - a.read;})
 }
  else if(e.target.id === "sortPage") {
      myLibrary.sort((a, b) => { return a.pages - b.pages;})
  }

    viewChecker();
};

function popoutModal(book) {
  modal.classList.add('active');
  overlay.classList.add('active');
  editedBook = book;
  return
};


function editBookinfo() {
  const editTitle = document.querySelector('#editTitle');
  const editName = document.querySelector('#editName');
  const editPage = document.querySelector('#editPage');

  editedBook.title = editTitle.value;
  editedBook.author = editName.value;
  editedBook.pages = editPage.value;

  editName.value = "";
  editTitle.value ="";
  editPage.value ="";

  viewChecker();
}

function closeModal (){
  modal.classList.remove('active');
  overlay.classList.remove('active');
  return
}

addBookbtn.addEventListener('click', addBookToLibrary);
cardViewbtn.addEventListener('click', renderCardlibrary);
tableViewbtn.addEventListener('click', renderTablelibrary);
sortBtns.forEach(sortBtn => sortBtn.addEventListener('click', sortArray));
saveChangebtn.addEventListener('click', editBookinfo);
closeModalbtn.addEventListener('click', closeModal);