document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');
  const searchForm = document.getElementById('searchBook');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    findBookByTitle();
  });
});






function addBook() {
  const bookTitle = document.getElementById('InputTitle').value;
  const bookWriter = document.getElementById('InputWriter').value;
  const bookYear = document.getElementById('InputYear').value;
  const bookIsComplete = document.getElementById('InputBookIsComplete').checked;
 
  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, bookTitle, bookWriter, bookYear,bookIsComplete);
  books.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
  return +new Date();
}
 
function generateBookObject(id, title, writer, year, isCompleted) {
  return {
    id,
    title,
    writer,
    year,
    isCompleted
  }
}

const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBOOKList = document.getElementById('books');
  uncompletedBOOKList.innerHTML = '';

  const completedBOOKList = document.getElementById('completed-books');
  completedBOOKList.innerHTML = '';
 
  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if(!bookItem.isCompleted){
        uncompletedBOOKList.append(bookElement);
    }else{
        completedBOOKList.append(bookElement);
    }
  }
});



function makeBook(bookObject) {
  const bookTitle = document.createElement('h5');
  bookTitle.innerText = bookObject.title;
 
  const bookWriter = document.createElement('p');
  bookWriter.innerText = bookObject.title;

  const bookYear = document.createElement('p');
  bookYear.innerText = bookObject.year;
 
  const textContainer = document.createElement('div');
  textContainer.classList.add('read');

  const leftContainer = document.createElement('div');
  leftContainer.classList.add('left');


  const rightContainer = document.createElement('div');
  rightContainer.classList.add('right');

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('aksi');

  textContainer.append(leftContainer);
  textContainer.append(rightContainer);
  rightContainer.append(buttonContainer);
  leftContainer.append(bookTitle, bookWriter,bookYear);
  
 
  const container = document.createElement('div');
  container.classList.add('item');
  container.append(textContainer);
  container.setAttribute('id', `book-${bookObject.id}`);

  if (bookObject.isCompleted) {
    const readButton = document.createElement('button');
    readButton.setAttribute('id','selesai');
    readButton.textContent = 'Belum Selesai Dibaca';

    readButton.addEventListener('click', function () {
      undoBookFromCompleted(bookObject.id);
    });
 
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('id','hapus');
    deleteButton.textContent = 'Hapus Buku';
 
    deleteButton.addEventListener('click', function () {
      removeBookFromCompleted(bookObject.id);
    });
 
    buttonContainer.append(readButton, deleteButton);
  } else {
    const notReadButton = document.createElement('button');
    notReadButton.setAttribute('id','belum-selesai');
    notReadButton.textContent = 'Selesai Dibaca';
    
    notReadButton.addEventListener('click', function () {
      addTaskToCompleted(bookObject.id);
    });
    
    buttonContainer.append(notReadButton);
  }
  return container;
}


function findBookByTitle(){
    const bookTitle = document.getElementById('InputTitleSearch').value;
    let hide = document.getElementsByClassName('item');

    const bookTarget = books.filter(book => book.title.toLowerCase().includes(bookTitle.toLowerCase()));
    console.log(bookTarget);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBookTitle(bookTitle,letter) {
    for (const bookItem of books) {
    if (bookItem.title.toLowerCase().includes(bookTitle)) {
      return bookItem;
    }
  }
  return null;
}


function addTaskToCompleted (bookId) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}


function removeBookFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);
 
  if (bookTarget === -1) return;
 
  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
 
  return -1;
}

