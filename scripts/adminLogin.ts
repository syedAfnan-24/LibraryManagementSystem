document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("adminLogin") as HTMLFormElement;

    if (loginForm) {
        loginForm.addEventListener("submit", function(event: Event) {
            event.preventDefault();

            const storedUserString = localStorage.getItem("admin");
            if (storedUserString) {
                const storedUser = JSON.parse(storedUserString);
                const enteredUsername = (document.getElementById("aname") as HTMLInputElement).value;
                const enteredPassword = (document.getElementById("apass") as HTMLInputElement).value;

                if (storedUser && storedUser.adminName === enteredUsername && storedUser.password === enteredPassword) {
                    // Redirect to user details page after successful login
                    sessionStorage.setItem("admin", storedUser.adminName);
                    window.location.href = "adminHome.html";
                } else {
                    alert("Invalid username or password. Please try again.");
                    // Optionally, you can clear the input fields after an unsuccessful login attempt
                    // loginForm.reset();
                }
            } else {
                alert("Admin credentials not found. Please sign up.");
            }
        });
    } else {
        console.error("Element with ID 'adminLogin' not found.");
    }
});
