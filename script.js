const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

let hasSubmitted = false; // Tracks if user has tried to submit

form.addEventListener('submit', e => {
    hasSubmitted = true;

    const isValid = validateInputs(); 
   

    if (!isValid) {
        e.preventDefault(); // Stops the form from submitting so that we can validate the inputs 
    } else {
        alert('Sent! Thank you for contacting us!');
    }
});

// Show red error
// // Checking if its an empty string
// // For red border color if the user clicks the button without filling the form
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

// Show green success, // // For green border color if the user fills the form
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

// Email format check
const isValidEmail = email => {
    const re =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // An email regex pattern
    return re.test(String(email).toLowerCase());
};

// Main validation
const validateInputs = () => {

     // getting the value for each of the field by declaring new variables
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    let isValid = true;

    if (nameValue === '') {
        if (hasSubmitted) setError(name, 'Please enter your name.');
        isValid = false;
    } else {
        setSuccess(name);
    }

    if (emailValue === '') {
        if (hasSubmitted) setError(email, 'Please enter your email address.');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        if (hasSubmitted) setError(email, 'Please enter a valid email address.');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (messageValue === '') {
        if (hasSubmitted) setError(message, 'Please enter your message.');
        isValid = false;
    } else {
        setSuccess(message);
    }

    return isValid;
};

// Live validation after first submit attempt
[name, email, message].forEach(input => {
    input.addEventListener('input', () => {
        if (hasSubmitted) {
            validateInputs();
        }

        
    });
});
