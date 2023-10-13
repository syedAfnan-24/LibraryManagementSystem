
// icons 
// const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//   <!-- Your SVG Path(s) Here -->
// </svg>`;


// Retrieve books from localStorage or initialize an empty array
let books = JSON.parse(localStorage.getItem('books')) || [];

// Function to edit a book by ID
function editBook(id) {
    const editedAuthor = prompt('Enter new author:');
    const editedYear = prompt('Enter new year:');

    if (editedAuthor && editedYear) {
        books = books.map(book => {
            if (book.title === id) {
                book.author = editedAuthor;
                book.year = editedYear;
            }
            return book;
        });

        saveBooksToLocalStorage();
        renderBooks();
    }
}
// Function to render books in the UI
function renderBooks() {
    const bookList = document.getElementById('bookList');
    const table = document.createElement('table');

    // Create header row
    const headerRow = table.insertRow();
    const headers = ['Title', 'Author', 'Year', 'Update', 'Delete'];

    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    books.forEach(book => {
        const row = table.insertRow();

        // Create cells for title, author, and year
        const titleCell = row.insertCell();
        titleCell.textContent = book.title;

        const authorCell = row.insertCell();
        authorCell.textContent = book.author;

        const yearCell = row.insertCell();
        yearCell.textContent = book.year;

        // Create cells for edit and delete buttons
        const editCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.id = 'edit-button';
        editButton.onclick = () => editBook(book.title);
        editCell.appendChild(editButton);

        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.id = 'delete-button';
        deleteButton.onclick = () => deleteBook(book.title);
        deleteCell.appendChild(deleteButton);
    });

    // Append the table to the bookList element
    bookList.innerHTML = '';
    bookList.appendChild(table);
}

// Function to add a new book
function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;

    if (title && author && year) {
        const newBook = {
            title: title,
            author: author,
            year: year,
        };

        books.push(newBook);
        saveBooksToLocalStorage();
        renderBooks();
        // Clear input fields after adding a book
        document.getElementById('bookTitle').value = '';
        document.getElementById('author').value = '';
        document.getElementById('year').value = '';
    }
}

// Function to add a new book
function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;

    if (title && author && year) {
        const newBook = {
            title: title,
            author: author,
            year: year,
        };

        books.push(newBook);
        saveBooksToLocalStorage();
        renderBooks();
        // Clear input fields after adding a book
        document.getElementById('bookTitle').value = '';
        document.getElementById('author').value = '';
        document.getElementById('year').value = '';
    }
}
// Function to delete a book by ID
function deleteBook(id) {
    books = books.filter(book => book.title !== id);
    saveBooksToLocalStorage();
    renderBooks();
}

// Function to save books to localStorage
function saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}


// Initial rendering of books
renderBooks();

