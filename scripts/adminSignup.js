const signup = document.getElementById("adminSignup");

signup.addEventListener("submit",function(event){
    event.preventDefault();

    const adminName = document.getElementById("aname").value;
    const adminPass = document.getElementById("apass").value;

    const admin = {
        adminName : adminName,
        password : adminPass
    }

    localStorage.setItem("admin",JSON.stringify(admin));
    alert("sign up successful")

    signup.reset();
})