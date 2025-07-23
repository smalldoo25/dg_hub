// js/data/menuData.js

export const menuData = {
    home: {
        title: 'Consumer Analytics',
        subItems: [
            { id: 'home-intro', text: 'Introduction', content: '<h3>Welcome Home!</h3><p>This is the introductory content for the Home section.</p><p>Explore our features and get started.</p><img src="./images/centerpic.png" class="img-fluid rounded-corners mt-3" alt="main contents"><img src="https://placehold.co/500x250/d1e7dd/0f5132?text=Home+Intro" class="img-fluid rounded-corners mt-3" alt="Home Introduction">' },
            { id: 'home-features', text: 'Key Features', content: '<h3>Our Key Features</h3><p>Discover the powerful features that make our platform stand out.</p><ul><li>Feature 1: Seamless Integration</li><li>Feature 2: Robust Security</li><li>Feature 3: User-Friendly Interface</li></ul>' },
            { id: 'home-testimonials', text: 'Testimonials', content: '<h3>What Our Clients Say</h3><p>"Excellent service and support!" - John Doe</p><p>"Highly recommended!" - Jane Smith</p>' }
        ]
    },
    products: {
        title: 'Demand/Value Analytics',
        subItems: [
            { id: 'prod-software', text: 'Software Solutions', content: '<h3>Software Solutions</h3><p>We offer a range of software products tailored to your business needs.</p><p>From CRM to ERP, find the perfect fit.</p><img src="https://placehold.co/500x250/cfe2ff/084298?text=Software+Solutions" class="img-fluid rounded-corners mt-3" alt="Software Solutions">' },
            { id: 'prod-hardware', text: 'Hardware Devices', content: '<h3>Hardware Devices</h3><p>Explore our cutting-edge hardware devices designed for performance and reliability.</p><p>Servers, workstations, and peripherals.</p>' },
            { id: 'prod-accessories', text: 'Accessories', content: '<h3>Accessories</h3><p>Enhance your experience with our wide selection of accessories.</p>' }
        ]
    },
    services: {
        title: 'UX/UI Analytics',
        subItems: [
            { id: 'serv-consulting', text: 'Consulting', content: '<h3>Consulting Services</h3><p>Our expert consultants provide strategic advice to help your business grow.</p><p>Leverage our industry knowledge.</p><img src="https://placehold.co/500x250/d1e7dd/0f5132?text=Consulting+Services" class="img-fluid rounded-corners mt-3" alt="Consulting Services">' },
            { id: 'serv-support', text: 'Technical Support', content: '<h3>Technical Support</h3><p>Get round-the-clock technical support from our dedicated team.</p>' },
            { id: 'serv-training', text: 'Training Programs', content: '<h3>Training Programs</h3><p>Empower your team with our comprehensive training programs.</p>' }
        ]
    },
    datascience: {
        title: 'Data Science and AI',
        subItems: [
            { id: 'serv-consulting', text: 'Consulting', content: '<h3>Consulting Services</h3><p>Our expert consultants provide strategic advice to help your business grow.</p><p>Leverage our industry knowledge.</p><img src="https://placehold.co/500x250/d1e7dd/0f5132?text=Consulting+Services" class="img-fluid rounded-corners mt-3" alt="Consulting Services">' },
            { id: 'serv-support', text: 'Technical Support', content: '<h3>Technical Support</h3><p>Get round-the-clock technical support from our dedicated team.</p>' },
            { id: 'serv-training', text: 'Training Programs', content: '<h3>Training Programs</h3><p>Empower your team with our comprehensive training programs.</p>' }
        ]
    },
    about: {
        title: 'About Us',
        subItems: [
            { id: 'about-company', text: 'Our Company', content: '<h3>About Our Company</h3><p>We are a leading provider of innovative solutions, committed to excellence and customer satisfaction.</p><p>Learn about our mission and values.</p><img src="https://placehold.co/500x250/fff3cd/664d03?text=Our+Company" class="img-fluid rounded-corners mt-3" alt="Our Company">' },
            { id: 'about-team', text: 'Our Team', content: '<h3>Meet Our Team</h3><p>Our diverse team of professionals is passionate about delivering high-quality results.</p>' },
            { id: 'about-history', text: 'Our History', content: '<h3>Our History</h3><p>Discover our journey from humble beginnings to a market leader.</p>' }
        ]
    },
    contact: {
        title: 'Contact Us',
        subItems: [
            { id: 'contact-form', text: 'Send a Message', content: '<h3>Send Us a Message</h3><p>Fill out the form below to get in touch with us.</p><form><div class="mb-3"><label for="name" class="form-label">Name</label><input type="text" class="form-control rounded-corners" id="name"></div><div class="mb-3"><label for="email" class="form-label">Email</label><input type="email" class="form-control rounded-corners" id="email"></div><div class="mb-3"><label for="message" class="form-label">Message</label><textarea class="form-control rounded-corners" id="message" rows="3"></textarea></div><button type="submit" class="btn btn-primary rounded-corners">Submit</button></form>' },
            { id: 'contact-info', text: 'Contact Information', content: '<h3>Contact Information</h3><p>Email: info@yourcompany.com</p><p>Phone: +1 (123) 456-7890</p><p>Address: 123 Main St, Anytown, USA</p>' }
        ]
    },
    legal: {
        title: 'Legal Information',
        subItems: [
            { id: 'privacy-policy', text: 'Privacy Policy', content: '<h3>Privacy Policy</h3><p>This is our Privacy Policy. We are committed to protecting your privacy and personal data. This policy explains how we collect, use, and share information about you.</p><p>This is placeholder content for the Privacy Policy.</p><p>Last Updated: July 10, 2025</p>' },
            { id: 'terms-of-service', text: 'Terms of Service', content: '<h3>Terms of Service</h3><p>By using our services, you agree to these Terms of Service. Please read them carefully.</p><ul><li>Acceptance of Terms</li><li>User Conduct</li><li>Intellectual Property</li><li>Limitation of Liability</li><li>Governing Law</li></ul><p>This is placeholder content for the Terms of Service.</p>' },
            { id: 'sitemap', text: 'Sitemap', content: '' }
        ]
    },
    utility: {
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
    }
};
