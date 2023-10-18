document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("adminLogin");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var storedUserString = localStorage.getItem("admin");
            if (storedUserString) {
                var storedUser = JSON.parse(storedUserString);
                var enteredUsername = document.getElementById("aname").value;
                var enteredPassword = document.getElementById("apass").value;
                if (storedUser && storedUser.adminName === enteredUsername && storedUser.password === enteredPassword) {
                    // Redirect to user details page after successful login
                    sessionStorage.setItem("admin", storedUser.adminName);
                    window.location.href = "adminHome.html";
                }
                else {
                    alert("Invalid username or password. Please try again.");
                    // Optionally, you can clear the input fields after an unsuccessful login attempt
                    // loginForm.reset();
                }
            }
            else {
                alert("Admin credentials not found. Please sign up.");
            }
        });
    }
    else {
        console.error("Element with ID 'adminLogin' not found.");
    }
});
