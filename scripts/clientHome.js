// client Details
document.addEventListener("DOMContentLoaded", function () {
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
        logoutBtn.addEventListener("click", function () {
            // Remove user data from local storage
            sessionStorage.removeItem("user");

            // Redirect to the login page after logout
            window.location.href = "index.html";
        });
    }
});

function displayLocalStorageList() {
    // Retrieve the list from local storage
    const storedList = localStorage.getItem("books");

    // Check if the list exists in local storage
    if (storedList) {
        // Parse the stored list from JSON to JavaScript array of objects
        const list = JSON.parse(storedList);

        // Get the display element from the HTML
        const displayElement = document.getElementById("display");

        // Clear previous content
        displayElement.innerHTML = '';

        // Create a table element
        const table = document.createElement('table');
        // Create a header row for the table
        const headerRow = table.insertRow();
        const headers = ['Title', 'Author', 'Year', 'Actions'];

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
            titleCell.textContent = item.title;

            const authorCell = row.insertCell();
            authorCell.textContent = item.author;

            const yearCell = row.insertCell();
            yearCell.textContent = item.year;

            // Create a cell for the Borrow button
            const borrowCell = row.insertCell();
            const borrowButton = document.createElement("button");
            borrowButton.textContent = "Borrow";
            borrowButton.id = "borrow-btn";
            borrowButton.addEventListener("click", function () {
                borrowBook(item.title);
                borrowButton.style.backgroundColor = "rgba(11, 118, 11, 0.546)"
                borrowButton.textContent = "Borrowed"
                borrowButton.disabled = true;
            });
            borrowCell.appendChild(borrowButton);
        });

        // Append the table to the display element
        displayElement.appendChild(table);
    } else {
        console.log('No list found in Local Storage.');
    }
}

let existingBorrows = JSON.parse(localStorage.getItem("borrow")) || [];
function borrowBook(bookTitle) {
    const storedUser = JSON.parse(localStorage.getItem(sessionStorage.getItem("user")));
    let x = prompt("enter the number of days you want to borrow this book for");
    let bDate = prompt("enter the borrow date in YYYY-MM-DD format")
    if(x!=""){
        const newBorrow = {
            name: storedUser.username,
            book: bookTitle,
            days: x,
            borrow: bDate
        }
        existingBorrows.push(newBorrow);
    
        localStorage.setItem("borrow", JSON.stringify(existingBorrows))
        document.getElementById("message").style.display = 'block';
        document.getElementById("message").innerHTML = "borrowed " + bookTitle + " for " + x + " days, on "+bDate
    }else{
        alert("book can't be borrowed without mention number of days")
    }
}

function borrowedList() {
    // Get the JSON data from localStorage and parse it
    const storedUser = JSON.parse(localStorage.getItem(sessionStorage.getItem("user")));
    const borrowData = JSON.parse(localStorage.getItem('borrow'));

    // Find the element where you want to display the table
    const tableContainer = document.getElementById('table-container');

    // Create an HTML table
    const table = document.createElement('table');
    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow(0);
    const headers = ['Name', 'Book', 'Days', 'Borrowed Date', 'Return'];
    
    // Populate table headers
    headers.forEach(headerText => {
        const th = document.createElement('th');
        const text = document.createTextNode(headerText);
        th.appendChild(text);
        headerRow.appendChild(th);
    });

    // Populate table with data
    borrowData.forEach(item => {
        if (item.name === storedUser.username) {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            const cell3 = row.insertCell();
            const cell4 = row.insertCell();
            const cell5 = row.insertCell(); //return book button
            cell1.textContent = item.name;
            cell2.textContent = item.book;
            cell3.textContent = item.days;
            cell4.textContent = item.borrow;

            const returnBookBtn = document.createElement('button')
            returnBookBtn.textContent = "Return"
            returnBookBtn.onclick = () => returnbook(item.name,item.book,item.borrow,item.days)
            cell5.appendChild(returnBookBtn)

        }
    });

    // Append the table to the container element
    tableContainer.appendChild(table);
}

//for printing return books list
function returnedBooksList() {
    const storedUser = JSON.parse(localStorage.getItem(sessionStorage.getItem("user")));
    const fineList = JSON.parse(localStorage.getItem("return"))
    const tableContainer = document.getElementById("returnedBookstbl");

    const table = document.createElement('table')
    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow(0);
    const headers = ['Student Name','Book', 'Borrowed Date', 'return Date', 'Fine Amount'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        const text = document.createTextNode(headerText);
        th.appendChild(text);
        headerRow.appendChild(th);
    });
    fineList.forEach(item => {
        if (item.name === storedUser.username) {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            const cell3 = row.insertCell();
            const cell4 = row.insertCell();
            const cell5 = row.insertCell();
            cell1.textContent = item.name;
            cell2.textContent = item.book;
            cell3.textContent = item.borrowDate;
            cell4.textContent = item.returnDate;
            cell5.textContent = item.fine;

        }
    });

    // Append the table to the container element
    tableContainer.appendChild(table);

}

let returnedBooks = JSON.parse(localStorage.getItem("return")) || [];
//return book function
function returnbook(name,book,borrowDate,days) {
    const returnDate = prompt("enter the date of return in YYYY-MM-DD format")
    // let fine = getDaysDifference(borrowDate,returnDate)*5
    let fine
    let x = getDaysDifference(borrowDate,returnDate)    
    console.log(x)
    if(x > days){
        fine = (x - days)*5
    }else{
        fine = 0
    }
    // console.log(fine)
    const newReturn = {
        name: name,
        book: book,
        borrowDate: borrowDate,
        returnDate: returnDate,
        fine: fine
    }
    returnedBooks.push(newReturn)
    localStorage.setItem("return",JSON.stringify(returnedBooks))

    //when book is returned the record from "borrow" local storage should be deleted
    const indexToRemove = existingBorrows.findIndex(record => record.name === name && record.book === book);

    // If the record is found, remove it
    if (indexToRemove !== -1) {
        existingBorrows.splice(indexToRemove, 1);

        // Update localStorage with the modified data
        localStorage.setItem("borrow", JSON.stringify(existingBorrows));
        document.getElementById("return-message").innerHTML = `${name} has returned ' ${book} ', and has a fine of amount  ${fine}`;
        document.getElementById("return-message").style.display = "block"
        console.log(`Record for ${name} and book ${book} has been removed.`);
    } else {
        console.log(`Record for ${name} and book ${book} not found.`);
    }

}

// Function to calculate the difference in days between two dates
function getDaysDifference(borrowDate, returnDate) {
    // Convert the dates to Date objects
    const startDate = new Date(borrowDate);
    const endDate = new Date(returnDate);

    // Calculate the time difference in milliseconds
    const timeDifference = endDate - startDate;

    // Convert the time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    // Return the absolute value of the difference to handle cases where returnDate is before borrowDate
    return Math.abs(daysDifference);
}
// Call the function to display the local storage list
displayLocalStorageList();
borrowedList();
returnedBooksList();