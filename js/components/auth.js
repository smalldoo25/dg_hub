// js/components/auth.js
import { updateContentArea } from './contentLoader.js'; // For redirecting after login
import { activateMenuItem } from './navigation.js'; // For activating home menu after login

// Function to get users from local storage
function getUsers() {
    const usersJson = localStorage.getItem('registeredUsers');
    return usersJson ? JSON.parse(usersJson) : [];
}

// Function to save users to local storage
function saveUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Function to display messages in the content area
function showMessage(elementId, message, type) {
    const messageBox = document.getElementById(elementId);
    if (messageBox) {
        messageBox.textContent = message;
        messageBox.className = `message-box ${type}`;
        messageBox.style.display = 'block';
    }
}

// Function to hide messages
function hideMessage(elementId) {
    const messageBox = document.getElementById(elementId);
    if (messageBox) {
        messageBox.style.display = 'none';
    }
}

// Attach event listeners for dynamically loaded forms
export function attachDynamicEventListeners() {
    // Registration Form Submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            hideMessage('registrationMessage');

            const regEmail = document.getElementById('regEmail').value;
            const regPassword = document.getElementById('regPassword').value;

            let users = getUsers();

            if (users.some(user => user.email === regEmail)) {
                showMessage('registrationMessage', 'Registration failed: User with this email already exists.', 'error');
                return;
            }

            users.push({ email: regEmail, password: regPassword });
            saveUsers(users);

            showMessage('registrationMessage', 'Registration successful! Please log in.', 'success');
            registrationForm.reset();
        });
    }

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            hideMessage('loginMessage');

            const loginEmail = document.getElementById('loginEmail').value;
            const loginPassword = document.getElementById('loginPassword').value;

            const users = getUsers();
            const foundUser = users.find(user => user.email === loginEmail && user.password === loginPassword);

            if (foundUser) {
                showMessage('loginMessage', 'Login successful! Redirecting to home page...', 'success');
                loginForm.reset();
                setTimeout(() => {
                    activateMenuItem('home'); // Redirect to home page
                }, 1500);
            } else {
                showMessage('loginMessage', 'Login failed: Invalid email or password.', 'error');
            }
        });
    }

    // Buttons within login/registration forms to switch between them
    const registerButton = document.getElementById('registerButton');
    if (registerButton) {
        registerButton.addEventListener('click', function (event) {
            event.preventDefault();
            updateContentArea('registration-page');
            document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => navLink.classList.remove('active'));
            document.getElementById('sidebar').classList.remove('show');
        });
    }

    const goToLoginButton = document.getElementById('goToLoginButton');
    if (goToLoginButton) {
        goToLoginButton.addEventListener('click', function (event) {
            event.preventDefault();
            updateContentArea('login-page');
            document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => navLink.classList.remove('active'));
            document.getElementById('sidebar').classList.remove('show');
        });
    }
}