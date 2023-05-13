// this is the javascript I have created for the customer login
// a lot of this code was derived from what I submitted for HBCS_CW2
// it was a movie rental website - and I took of the basic functionality as a template for this

function inputErrorInit(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function formMessageInit(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function ValidateEmail(inputElement) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      
    if (inputElement.value.match(validRegex)) {
        return true;
    } else {
        return false;
    }
    // checking that an email is valid when an account is created
}

function passwordMatch(inputElement){
    var password = document.querySelector("#signupPassword1");
    
    if (inputElement.value == password.value) {
        return true;
    } else {
        return false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    if (document.querySelector("#signInEmail").value == "" || document.querySelector("#signInPassword").value == "") {
        formMessageInit(loginForm, "error", "Invalid Email or password");
    } else {
        // Send login form data to server using AJAX
        // The form data is then passed into login.php script, where it is checked against the data stored in the database
        $.ajax({
            type: "POST",
            url: "login.php",
            data: {
                email: document.querySelector("#signInEmail").value,
                password: document.querySelector("#signInPassword").value
            },
            success: function(response) {
                if (response === "success") {
                    //if the account details are correct, the user is redirected to the main page of the website
                    window.location.href = "browse.html";
                } else {
                    formMessageInit(loginForm, "error", "Invalid Email or password");
                }
            },
            error: function() {
                formMessageInit(loginForm, "error", "An error occurred while processing your request");
            }
        });
    }
});


    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupEmail" && e.target.value.length > 0 && e.target.value.length < 4) {
                inputErrorInit(inputElement, "Email must be at least 4 characters in length");
            }
            if(e.target.id === "signupEmail" && !ValidateEmail(document.querySelector("#signupEmail"))) {
                inputErrorInit(inputElement, "Please use a valid email address");
            }
            if(e.target.id === "signupPassword2" && !passwordMatch(document.querySelector("#signupPassword2"))) {
                inputErrorInit(inputElement, "Passwords do not match");
            }
        });
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        if (!passwordMatch(signupPassword2)) {
            formMessageInit(createAccountForm, "error", "Passwords do not match");
        } else if (document.querySelector("#signupEmail").value == "" || document.querySelector("#signupEmail").value == "" || document.querySelector("#signupPassword1").value == "" || document.querySelector("#signupPassword2").value == "") {
            formMessageInit(createAccountForm, "error", "Please fill in all fields");
        } else {
            $.ajax({
                // passes the input data through to createaccount.php
                // here the email and password is uploaded to the database (unless the account already exists)
                type: "POST",
                url: "createaccount.php",
                data: {
                    email: document.querySelector("#signupEmail").value,
                    password: document.querySelector("#signupPassword1").value
                },
                success: function(response) {
                    if (response === "success") {
                        window.location.href = "browse.html";
                    } else {
                        formMessageInit(createAccountForm, "error", response);
                    }
                },
                error: function() {
                    formMessageInit(createAccountForm, "error", "An error occurred while processing your request");
                }
            });
        }
    });
                
    
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
    
    
    