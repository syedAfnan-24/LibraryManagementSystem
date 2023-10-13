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
            borrowButton.addEventListener("click", function () {
                borrowBook(item.title);
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
    let x = prompt("enter the number of days you want to borrow this book for")
    const newBorrow = {
        name: storedUser.username,
        book: bookTitle,
        days: x
    }
    existingBorrows.push(newBorrow);

    localStorage.setItem("borrow", JSON.stringify(existingBorrows))
    document.getElementById("message").style.display = 'block';
    document.getElementById("message").innerHTML = "borrowed "+bookTitle+" for "+x+" days"
}

// Call the function to display the local storage list
displayLocalStorageList();