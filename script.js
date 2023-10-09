const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const branch = document.getElementById("branch").value;
    const usn = document.getElementById("usn").value;
    const semester = document.getElementById("semester").value;

    // Create a user object with form data
    const user = {
        username: username,
        password: password,
        branch: branch,
        usn: usn,
        semester: semester
    };

    // Store the user object in local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Optionally, you can redirect to a different page after signup
    // window.location.href = "success.html";

    // Reset the form after submission
    signupForm.reset();
});
