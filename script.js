document.addEventListener('DOMContentLoaded', function () {
    const fieldsToValidate = [
        { id: 'first-name', errorId: 'first-name-error' },
        { id: 'last-name', errorId: 'last-name-error' },
        { id: 'city', errorId: 'city-error' }
    ];

    fieldsToValidate.forEach(field => {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.errorId);

        input.addEventListener('input', function () {
            let sanitizedValue = input.value.replace(/\d/g, '');
            
            if (sanitizedValue !== input.value) {
                error.textContent = 'Numbers are not allowed in this field.';
                error.style.color = 'red';
                input.value = sanitizedValue;
                input.setSelectionRange(input.value.length, input.value.length);
            } else if (field.id !== 'city' && input.value.length > 0 && input.value.length < 6) {
                error.textContent = 'Name must be at least 6 letters long.';
                error.style.color = 'red';
            } else {
                error.textContent = '';
            }
            if (input.value.length > 0) {
                input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
            }
        });
    });

    const numericFieldsToValidate = [
        { id: 'phone-number', errorId: 'phone-number-error' },
        { id: 'birth-date', errorId: 'birth-date-error' },
        { id: 'postal-code', errorId: 'postal-code-error' }
    ];

    numericFieldsToValidate.forEach(field => {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.errorId);

        input.addEventListener('keypress', function (event) {
            const char = String.fromCharCode(event.which);
            if (!/^[0-9+\-\/]*$/.test(char)) {
                event.preventDefault();
                error.textContent = 'Only numbers are allowed in this field.';
                error.style.color = 'red';
            } else {
                error.textContent = '';
            }
        });

        input.addEventListener('input', function () {
            if (/[^0-9+\-\/]/.test(input.value)) {
                error.textContent = 'Only numbers are allowed in this field.';
                error.style.color = 'red';
            } else {
                error.textContent = '';
            }

            if (field.id === 'phone-number') {
                if (input.value.length === 1 && !/^[987]/.test(input.value)) {
                    error.textContent = 'Phone number must start with 9, 8, or 7.';
                    error.style.color = 'red';
                    input.value = '';
                    input.setSelectionRange(0, 0);
                } else if (input.value.length > 10) {
                    error.textContent = 'Phone number must be exactly 10 digits.';
                    error.style.color = 'red';
                    input.value = input.value.slice(0, 10);
                    input.setSelectionRange(input.value.length, input.value.length);
                }
            }
        });

        input.addEventListener('blur', function () {
            if (field.id === 'phone-number' && input.value.length !== 10) {
                error.textContent = 'Phone number must be exactly 10 digits.';
                error.style.color = 'red';
            } else {
                error.textContent = '';
            }
        });
    });

    document.getElementById('togglePassword').addEventListener('click', function () {
        const passwordField = document.getElementById('password');
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });

    const emailField = document.getElementById('email-address');
    emailField.addEventListener('input', function () {
        const emailError = document.getElementById('email-address-error');
        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

        if (!emailPattern.test(emailField.value)) {
            emailError.textContent = 'Please enter a valid email address. Only "@" is allowed as a special character.';
            emailError.style.color = 'red';
        } else {
            emailError.textContent = '';
        }
    });

    const passwordField = document.getElementById('password');
    const passwordError = document.getElementById('password-error');

    passwordField.addEventListener('input', function () {
        const validSpecialChars = /^[a-zA-Z0-9@$]*$/;
        const invalidCharsPattern = /[^a-zA-Z0-9@$]/;

        if (!validSpecialChars.test(passwordField.value)) {
            passwordError.textContent = 'Only @ and $ are allowed as special characters.';
            passwordError.style.color = 'red';
            passwordField.value = passwordField.value.replace(invalidCharsPattern, '');
        } else {
            passwordError.textContent = '';
        }
    });
});
alert("this form is regarding the registration submission of the experiment 02")
