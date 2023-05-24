let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");

let userError = document.getElementById("userError");
let emailError = document.getElementById("emailError");
let pwError = document.getElementById("pwError");
let pw2Error = document.getElementById("pw2Error");

var validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


function validateRegister() {
    event.preventDefault();

    if(username.value == "" || username.value.length < 4) userError.classList.add("error");
    else userError.classList.remove("error");

    if(email.value == "" || !email.value.match(validEmailRegex)) emailError.classList.add("error");
    else emailError.classList.remove("error");

    if(password.value == "" || password.value.length < 8) pwError.classList.add("error");
    else pwError.classList.remove("error");

    if(password2.value == "" || password.value.length < 8 || password.value !== password2.value) pw2Error.classList.add("error");
    else pw2Error.classList.remove("error");
    
}