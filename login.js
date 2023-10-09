// login.js 
const loginForm = document.getElementById("loginForm");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const resetPasswordForm = document.getElementById("resetPasswordForm");
const resetForm = document.getElementById("resetForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    if (storedUser && storedUser.username === enteredUsername && storedUser.password === enteredPassword) {
        // Redirect to user details page after successful login
        window.location.href = "userdetails.html";
    } else {
        alert("Invalid username or password. Please try again.");
        // Optionally, you can clear the input fields after unsuccessful login attempt
        // loginForm.reset();
    }
});

forgotPasswordLink.addEventListener("click", function(event) {
    event.preventDefault();
    loginForm.style.display = "none";
    resetPasswordForm.style.display = "block";
});
resetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const username = prompt("Enter your username:");

    // Check if the username exists in your system (this could be done with an API call)
    if (username) {
        // Update the password (in this example, updating the local storage)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.username === username) {
            storedUser.password = newPassword;
            localStorage.setItem("user", JSON.stringify(storedUser));
            alert("Password reset successfully!");
            // Redirect to login page after password reset
            window.location.href = "login.html";
        } else {
            alert("Invalid username.");
        }
    } else {
        alert("Username cannot be empty.");
    }
});
