
// Copied from login.js but adapted to work with admin database table, and with the additional functionality of verification codes!!

function inputErrorInit(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}
function generateVerificationCode() {
    // Generate a random 6-digit verification code (to be sent to admin email)
    return Math.floor(Math.random() * 900000) + 100000;
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
const adminLoginForm = document.getElementById("adminLogin");
const verificationPopup = document.getElementById("verificationPopup");
const verificationPopupClose = document.getElementById("verificationPopupClose");
const verificationCodeInput = document.getElementById("verificationCode");
const btnSignIn = document.getElementById("btnSignIn");
const btnVerify = document.getElementById("btnVerify");
let genVerificationCode = generateVerificationCode();
// not sure all this stuff needs to be here still, but it's doing no harm ;)

// Prevent form submission
adminLoginForm.addEventListener("submit", e => {
    e.preventDefault();

    
});


// Close the popup when x is clicked
verificationPopupClose.addEventListener("click", () => {
    verificationPopup.style.display = "none";
});

// Closes popup when clicking outside of the popup box
window.addEventListener("click", e => {
    if (e.target === verificationPopup) {
        verificationPopup.style.display = "none";
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#adminLogin");
    
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        if (document.querySelector("#adminEmail").value == "" || document.querySelector("#adminPassword").value == "") {
            formMessageInit(loginForm, "error", "Invalid Email or password");
        } else {
            // this section handles the admin login
            // inputted email and password will be sent to the php script
            // the php script will check if the details are correct
            $.ajax({
                type: "POST",
                url: "adminLogin.php",
                data: {
                    email: document.querySelector("#adminEmail").value,
                    password: document.querySelector("#adminPassword").value
                },
                success: function(response) {
                    if (response === "success") {
                        emailjs.init('m8hVCxI2g_7OI4t0a');
                        //this section will only be accessed if admin credentials are correct
                        verifyCode();
                        //verifyCode is called where a verification code will be generated and emailed;
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
    function sendVerificationCode(emailAddress) {
        // this is the function that actually sends the verification code by email to admin recipient
        // this has been done with help from the emailjs library
        // https://stackoverflow.com/questions/58791656/send-email-directly-from-javascript-using-emailjs
        const message = "Here is your verification code: " + genVerificationCode;
        const params = {
          to_email: emailAddress,
          subject: "Verification Code for Admin Login",
          message: message
        };
        emailjs.send('service_gcxw9d5', 'template_h65tnoh', params)
        .then(function(response) {
          console.log("Verification code sent:", response);
          
          // Display a success message to the user if the email has been sent
          alert("A verification code has been sent to your email address.");
        }, function(error) {
          console.error("Error sending verification code:", error);
          
          // Display an error message to the user if neccessary
          alert("An error occurred while sending the verification code. Please try again later.");
        });
    }
    
      
    function verifyCode() {
        verificationPopup.style.display = "block";
        const email = document.querySelector("#adminEmail").value;
        const code = verificationCodeInput.value;
        sendVerificationCode(email);
        //this function probably doesn't need to be separate, oh well
        // it activates the verification popup, then passes the admin email into the sendVerificationCode() function
       
       
      
    }
    
    
    btnVerify.addEventListener("click", () => {
        const verificationCodeInput = document.getElementById("verificationCode");
        const verificationCode = parseInt(verificationCodeInput.value);
        // this function listens out for the verify button to be clicked
        // if the entered code matches the generated code that was sent out, then the admin can log in
      
        if (verificationCode === genVerificationCode) {
          // Redirect to admin home page
          window.location.href = "admin.html";
        } else {
          alert("Invalid verification code");
          
        }
      });
      
      
    
      

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    const inputElements = loginForm.querySelectorAll(".form__input");

    inputElements.forEach(inputElement => {
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
