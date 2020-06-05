let myLibrary = [];

class Book {
    //the contructor...
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.onHTML = false;
    }
}

function deleteTable() {
    
}
function tableInit() {
    const tempTable = document.querySelector('.bookTable');
    let queueTable = document.createElement('table');
    let headerRow = queueTable.insertRow(); 

    let thTitle = document.createElement('th');
    thTitle.textContent = 'Title';
    headerRow.appendChild(thTitle);

    let thAuthor = document.createElement('th');
    thAuthor.textContent = 'Author';
    headerRow.appendChild(thAuthor);

    let thPages = document.createElement('th');
    thPages.textContent = 'Pages';
    headerRow.appendChild(thPages);

    let thRead  = document.createElement('th');
    thRead.textContent = 'Read'; 
    headerRow.appendChild(thRead);

    let thReadToggle = document.createElement('th');
    thReadToggle.textContent = 'Toggle';
    headerRow.appendChild(thReadToggle);

    let thDelete = document.createElement('th');
    thDelete.textContent = 'Delete';
    headerRow.appendChild(thDelete);

    tempTable.appendChild(queueTable);
}

function render() {
    const queueTable = document.querySelector('table');
    
    myLibrary.forEach(book => {
        if (book.onHTML === true) {
            return;
        }
        let bookRow = queueTable.insertRow();
        let bookTitle = document.createElement('td');
        bookTitle.textContent = book.title;
        bookRow.appendChild(bookTitle);

        let bookAuthor = document.createElement('td');
        bookAuthor.textContent = book.author;
        bookRow.appendChild(bookAuthor);

        let bookPages = document.createElement('td');
        bookPages.textContent = book.pages;
        bookRow.appendChild(bookPages);

        let bookRead = document.createElement('td');
        bookRead.id = book.title + 'ReadStatus';
        bookRead.textContent = book.read;
        bookRow.appendChild(bookRead);

        const readToggle = document.createElement('td');

        const readToggleButton = document.createElement('button');
        readToggleButton.id = book.title;
        readToggleButton.textContent = 'Toggle';
        readToggleButton.addEventListener('click', toggleRead);
        readToggle.appendChild(readToggleButton);
        bookRow.appendChild(readToggle);

        const deleteTd = document.createElement('td');
        deleteTd.id = book.title + 'Delete';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', deleteBook);
        deleteTd.appendChild(deleteButton);
        bookRow.appendChild(deleteTd);


        queueTable.appendChild(bookRow);

        
        book.onHTML = true;
    });

}
const addButton = document.querySelector('#btn');
addButton.addEventListener('click', () => {
    let readBool = false;
    let bookTitle = document.getElementById("bTitle").value;
    let bookAuthor = document.getElementById("bAuthor").value;
    if(bookTitle === "" || bookAuthor == "") {
        return;
    } 
    if (document.getElementById("readYes").checked === true) {
           readBool = true;
    }
    const newBook = new Book(
        bookTitle,
        bookAuthor,
        document.getElementById("bPages").value,
        readBool
    )
    addToLibrary(newBook);
});

function toggleRead(e) {
    let toBeToggled = myLibrary.find(book => book.title === e.target.id);
    toBeToggled.read = !toBeToggled.read;
    document.getElementById(toBeToggled.title + 'ReadStatus').textContent = toBeToggled.read;
}

function deleteBook(e) {
    let deleteBook = myLibrary.find(book => book.title + 'Delete' === e.target.id);
    myLibrary.splice(searchBook(deleteBook), 1);
    let deleteTr = e.target.parentElement.parentElement;
    deleteTr.parentElement.removeChild(deleteTr);
}

function searchBook(book) {
    let chosenBook = book;
    for(let i = 0; i < myLibrary.length; i++) {
        if(chosenBook === myLibrary[i]) {
            return i;
        }
    }
    return -1;
}


function addToLibrary(book) {
    // do stuff here
    myLibrary.push(book);
    render();
}

tableInit();
// Book.prototype.addToLibrary = function() {
//     this
// }