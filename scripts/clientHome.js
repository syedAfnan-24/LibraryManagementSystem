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
    let bDate = prompt("enter the borrow date")
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
    const headers = ['Name', 'Book', 'Days', 'Borrowed Date'];
    
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
            cell1.textContent = item.name;
            cell2.textContent = item.book;
            cell3.textContent = item.days;
            cell4.textContent = item.borrow;
        }
    });

    // Append the table to the container element
    tableContainer.appendChild(table);
}

// Call the function to display the local storage list
displayLocalStorageList();
borrowedList();