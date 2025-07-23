// js/data/utilityData.js
export const utilityData = {
    title: 'Utility Pages',
    subItems: [
        {
            id: 'login-page', text: 'Login', content: `
                    <h3>Login to Your Account</h3>
                    <form id="loginForm">
                        <div class="mb-3">
                            <label for="loginEmail" class="form-label">Email address</label>
                            <input type="email" class="form-control rounded-corners" id="loginEmail" aria-describedby="emailHelp" required>
                        </div>
                        <div class="mb-3">
                            <label for="loginPassword" class="form-label">Password</label>
                            <input type="password" class="form-control rounded-corners" id="loginPassword" required>
                        </div>
                        <button type="submit" class="btn btn-primary rounded-corners">Login</button>
                        <div id="loginMessage" class="message-box mt-3" style="display: none;"></div>
                    </form>
                    <p class="mt-3">Not registered yet? <button class="btn btn-link p-0 align-baseline" id="registerButton">Sign up here</button>.</p>
                `},
        {
            id: 'registration-page', text: 'Register', content: `
                    <h3>Register for an Account</h3>
                    <form id="registrationForm">
                        <div class="mb-3">
                            <label for="regEmail" class="form-label">Email address</label>
                            <input type="email" class="form-control rounded-corners" id="regEmail" required>
                        </div>
                        <div class="mb-3">
                            <label for="regPassword" class="form-label">Password</label>
                            <input type="password" class="form-control rounded-corners" id="regPassword" required>
                        </div>
                        <button type="submit" class="btn btn-primary rounded-corners">Register</button>
                        <div id="registrationMessage" class="message-box mt-3" style="display: none;"></div>
                    </form>
                    <p class="mt-3">Already have an account? <button class="btn btn-link p-0 align-baseline" id="goToLoginButton">Login here</button>.</p>
                `},
        { id: 'help-page', text: 'Help & Support', content: '<h3>Help & Support</h3><p>Welcome to our Help Center. Here you can find answers to frequently asked questions and contact our support team.</p><h4>Frequently Asked Questions:</h4><ul><li>How do I reset my password?</li><li>What payment methods do you accept?</li><li>How can I contact customer service?</li></ul><p>For further assistance, please use our <a href="#" class="utility-link" data-content-id="contact-form">Contact Form</a>.</p>' }
    ]
};