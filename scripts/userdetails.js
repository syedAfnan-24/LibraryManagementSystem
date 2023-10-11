// userdetails.js
document.addEventListener("DOMContentLoaded", function() {
    const storedUser = JSON.parse(localStorage.getItem(sessionStorage.getItem("user")));

    if (storedUser) {
        const userDetailsDiv = document.getElementById("userDetails");
        userDetailsDiv.innerHTML = `
            <p><strong>Username:</strong> ${storedUser.username}</p>
            <p><strong>Branch:</strong> ${storedUser.branch}</p>
            <p><strong>University Number (USN):</strong> ${storedUser.usn}</p>
            <p><strong>Semester:</strong> ${storedUser.semester}</p>
        `;
        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", function() {
            // Remove user data from local storage
            sessionStorage.removeItem("user");

            // Redirect to the login page after logout
            window.location.href = "index.html";
        });
    }
});


// Retrieve books from localStorage or initialize an empty array
let books = JSON.parse(localStorage.getItem('books')) || [];

// Function to edit a book by ID
function editBook(id) {
    const editedTitle = prompt('Enter new title:');
    const editedAuthor = prompt('Enter new author:');
    const editedYear = prompt('Enter new year:');

    if (editedTitle && editedAuthor && editedYear) {
        books = books.map(book => {
            if (book.id === id) {
                book.title = editedTitle;
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
    bookList.innerHTML = '';

    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} Published in year (${book.year})`;

        // Edit button for each book
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editBook(book.id);
        
        // Delete button for each book
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteBook(book.id);
        
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        bookList.appendChild(li);
    });
}

// Function to add a new book
function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;

    if (title && author && year) {
        const newBook = {
            id: Date.now(),
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
    books = books.filter(book => book.id !== id);
    saveBooksToLocalStorage();
    renderBooks();
}

// Function to save books to localStorage
function saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}


function renderBooksForClient() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} Published in year (${book.year})`;

        bookList.appendChild(li);
    });
}

// Initial rendering of books
renderBooks();

