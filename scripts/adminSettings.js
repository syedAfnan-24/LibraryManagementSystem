
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

    //adding table heading for each cell
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    // entering all books data in each row in the table
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
        editButton.id = 'edit-button';  //creating id to add css
        editButton.onclick = () => editBook(book.title);
        editCell.appendChild(editButton);

        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.id = 'delete-button'; //creating id to add css
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
function displayLocalStorageList() {
    // Retrieve the list from local storage
    const storedList = localStorage.getItem("borrow");

    // Check if the list exists in local storage
    if (storedList) {
        // Parse the stored list from JSON to JavaScript array of objects
        const list = JSON.parse(storedList);

        // Get the display element from the HTML
        const displayElement = document.getElementById("borrowList");

        // Clear previous content
        displayElement.innerHTML = '';

        // Create a table element
        const table = document.createElement('table');
        // Create a header row for the table
        const headerRow = table.insertRow();
        const headers = ['Student Name', 'Book', 'Days Borrowed', 'Borrowed Date'];

        // Iterate through the headers and create <th> elements
        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });


        // Iterate through the list and display each item in the table
        list.forEach(item => {
            // Create a new row for each item
            const row = table.insertRow();

            // Create cells for each property (title, author, year)
            const titleCell = row.insertCell();
            titleCell.textContent = item.name;

            const authorCell = row.insertCell();
            authorCell.textContent = item.book;

            const yearCell = row.insertCell();
            yearCell.textContent = item.days;

            const dateCell = row.insertCell();
            dateCell.textContent = item.borrow;

        });

        // Append the table to the display element
        displayElement.appendChild(table);
    } else {
        console.log('No list found in Local Storage.');
    }
}


// Initial rendering of books
renderBooks();

//Initial rendering of students who have borrowed book
displayLocalStorageList();