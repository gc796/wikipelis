let firstName = document.getElementById("first-name");
let email = document.getElementById("email");
let contactArea = document.getElementById("contact-area");

let userError = document.getElementById("userError");
let emailError = document.getElementById("emailError");
let contactError = document.getElementById("contact-error");

var validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


function validateRegister() {
    event.preventDefault();

    if(firstName.value == "") firstNameError.classList.add("error");
    else firstNameError.classList.remove("error");
    
    if(email.value == "" || !email.value.match(validEmailRegex)) emailError.classList.add("error");
    else emailError.classList.remove("error");

    if(contactArea.value == "") contactError.classList.add("error");
    else contactError.classList.remove("error");

}