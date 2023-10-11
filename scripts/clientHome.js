// client Details
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

        // Iterate through the list and display each item in the HTML element
        list.forEach(item => {
            // Create a new paragraph element for each item
            const newItemElement = document.createElement("p");
            // Set the text content of the paragraph element with item details
            newItemElement.textContent = 'Title: ' + item.title + ', Author: ' + item.author + ', Year: ' + item.year;
            // Append the paragraph element to the display element
            displayElement.appendChild(newItemElement);
        });
    } else {
        console.log('No list found in Local Storage.');
    }
}

// Call the function to display the local storage list
displayLocalStorageList();